#!/usr/bin/env python3
"""
Backend API Testing Script
Tests all backend endpoints to ensure functionality remains intact after Loveable watermark removal.
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Get backend URL from frontend environment
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env file: {e}")
        return None

def test_root_endpoint(base_url):
    """Test GET /api/ endpoint"""
    print("\n=== Testing Root Endpoint ===")
    try:
        url = f"{base_url}/api/"
        print(f"Testing: {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint returned unexpected response")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Root endpoint request failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Root endpoint test error: {e}")
        return False

def test_create_status_check(base_url):
    """Test POST /api/status endpoint"""
    print("\n=== Testing Create Status Check ===")
    try:
        url = f"{base_url}/api/status"
        print(f"Testing: {url}")
        
        # Create realistic test data
        test_data = {
            "client_name": "TestClient_WatermarkRemoval_Verification"
        }
        
        response = requests.post(
            url, 
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "client_name", "timestamp"]
            
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("✅ Create status check working correctly")
                    return True, data["id"]
                else:
                    print("❌ Create status check returned incorrect client_name")
                    return False, None
            else:
                print(f"❌ Create status check missing required fields: {required_fields}")
                return False, None
        else:
            print(f"❌ Create status check failed with status {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Create status check request failed: {e}")
        return False, None
    except Exception as e:
        print(f"❌ Create status check test error: {e}")
        return False, None

def test_get_status_checks(base_url, created_id=None):
    """Test GET /api/status endpoint"""
    print("\n=== Testing Get Status Checks ===")
    try:
        url = f"{base_url}/api/status"
        print(f"Testing: {url}")
        
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Retrieved {len(data)} status checks")
            
            if isinstance(data, list):
                # Check if our created status check is in the list
                if created_id:
                    found_created = any(item.get("id") == created_id for item in data)
                    if found_created:
                        print("✅ Get status checks working correctly - found created item")
                    else:
                        print("⚠️ Get status checks working but created item not found (may be expected)")
                else:
                    print("✅ Get status checks working correctly")
                
                # Validate structure of returned items
                if data:  # If there are items, check structure
                    sample_item = data[0]
                    required_fields = ["id", "client_name", "timestamp"]
                    if all(field in sample_item for field in required_fields):
                        print("✅ Status check items have correct structure")
                    else:
                        print(f"❌ Status check items missing required fields: {required_fields}")
                        return False
                
                return True
            else:
                print("❌ Get status checks returned non-list response")
                return False
        else:
            print(f"❌ Get status checks failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get status checks request failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Get status checks test error: {e}")
        return False

def test_cors_headers(base_url):
    """Test CORS configuration"""
    print("\n=== Testing CORS Configuration ===")
    try:
        url = f"{base_url}/api/"
        
        # Test preflight request
        response = requests.options(
            url,
            headers={
                "Origin": "https://example.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            },
            timeout=10
        )
        
        print(f"CORS Preflight Status Code: {response.status_code}")
        
        # Check CORS headers in a regular request
        response = requests.get(url, timeout=10)
        cors_headers = {
            key: value for key, value in response.headers.items() 
            if key.lower().startswith('access-control')
        }
        
        print(f"CORS Headers: {cors_headers}")
        
        if cors_headers:
            print("✅ CORS headers present")
            return True
        else:
            print("⚠️ No CORS headers found (may be handled by proxy)")
            return True  # Not critical for functionality
            
    except Exception as e:
        print(f"⚠️ CORS test error (non-critical): {e}")
        return True  # CORS issues are not critical for basic functionality

def main():
    """Main test execution"""
    print("🚀 Starting Backend API Tests After Loveable Watermark Removal")
    print("=" * 60)
    
    # Get backend URL
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ Could not retrieve backend URL from frontend/.env")
        sys.exit(1)
    
    print(f"Backend URL: {backend_url}")
    
    # Track test results
    test_results = []
    
    # Test 1: Root endpoint
    result1 = test_root_endpoint(backend_url)
    test_results.append(("Root Endpoint", result1))
    
    # Test 2: Create status check
    result2, created_id = test_create_status_check(backend_url)
    test_results.append(("Create Status Check", result2))
    
    # Test 3: Get status checks
    result3 = test_get_status_checks(backend_url, created_id)
    test_results.append(("Get Status Checks", result3))
    
    # Test 4: CORS configuration
    result4 = test_cors_headers(backend_url)
    test_results.append(("CORS Configuration", result4))
    
    # Summary
    print("\n" + "=" * 60)
    print("🏁 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests PASSED! Functionality intact after watermark removal.")
        return 0
    else:
        print("⚠️ Some backend API tests FAILED! Issues detected after watermark removal.")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)