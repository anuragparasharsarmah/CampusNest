import itertools
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import openpyxl

def perform_login(driver):
    driver.get("http://localhost:5174/sign-in")
    driver.find_element(By.ID, "email").send_keys("example@gmail.com")
    driver.find_element(By.ID, "password").send_keys("StrongPassword787!")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(1)

base_url = "http://localhost:5174"
routes = ["", "/search", "/my-bookings", "/my-hotels", "/add-hotel"]

def test_route_sequence(route_sequence):
    driver = webdriver.Chrome()
    perform_login(driver)
    for route in route_sequence:
        url = base_url + route
        print("Navigating to:", url)
        driver.get(url)
        time.sleep(2)
        if "404" in driver.title:
            driver.quit()
            return False
    driver.quit()
    return True

route_permutations = itertools.permutations(routes)

workbook = openpyxl.Workbook()
sheet = workbook.active
sheet.append(["Route Sequence", "Result"])

for permutation in route_permutations:
    success = test_route_sequence(permutation)
    route_sequence_str = ' -> '.join(permutation)
    sheet.append([route_sequence_str, "Success" if success else "Failure"])

workbook.save("common/test/RoutingFunctionalityTesting/RouteTestResultsAfterLogin.xlsx")