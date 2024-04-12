import json
import time
import openpyxl
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

base_url = "http://localhost:5174"
sign_in_url = base_url + "/sign-in"
register_url = base_url + "/register"

def perform_test(data):
    driver = webdriver.Chrome()
    driver.get(register_url)
    driver.find_element(By.ID, "firstName").send_keys(data["firstname"])
    driver.find_element(By.ID, "lastName").send_keys(data["lastname"])
    driver.find_element(By.ID, "email").send_keys(data["email"])
    driver.find_element(By.ID, "password").send_keys(data["password"])
    driver.find_element(By.ID, "confirmPassword").send_keys(data["confirmPassword"])
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    try:
        WebDriverWait(driver, 2).until(EC.url_changes(register_url))
        test_result = "Successful SignUp"
    except TimeoutException:
        test_result = "Failed SignUp"
    driver.quit()
    return test_result

with open("common/test/SignUpFormTesting/SignUpTestCases.json", "r") as file:
    test_cases = json.load(file)

workbook = openpyxl.Workbook()
sheet = workbook.active
sheet.append(["Test Case", "Result"])

for case in test_cases:
    test_case = case["test_case"]
    data = case["data"]
    result = perform_test(data)
    sheet.append([test_case, result])
    workbook.save("common/test/SignUpFormTesting/SignUpTestResults.xlsx")
    time.sleep(1)

print("All tests completed. Test results are saved in 'test_results.xlsx'.")