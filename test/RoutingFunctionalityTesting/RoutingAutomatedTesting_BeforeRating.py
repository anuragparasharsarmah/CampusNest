import itertools
import time
from selenium import webdriver
import openpyxl

base_url = "http://localhost:5174"
routes = ["", "/search", "/sign-in", "/register"]

def test_route_sequence(route_sequence):
    driver = webdriver.Chrome()
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

workbook.save("common/test/RoutingFunctionalityTesting/RouteTestResultsBeforeLogin.xlsx")
