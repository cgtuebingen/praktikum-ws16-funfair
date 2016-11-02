#!/usr/bin/env python

import requests

def main2():

    print("---START---")

    r = requests.get("https://deepart.io/hire/", verify=False)     

    # r = requests.get("https://www.google.de/")
    # r = requests.get("https://www.google.de/", params={"#q": "value"})

    print()
    print(r.url)
    print(r.text)

    print("---END---")


def main():

     # Fill in your details here to be posted to the login form.
    payload = {
        'inUserName': 'rgeirhos@web.de',
        'inUserPass': 'tiferkunschd'
    }

    url = 'https://www.deepart.io/login/'

    # Use 'with' to ensure the session context is closed after use.
    with requests.Session() as s:
        p = s.post(url, data=payload, verify=False)
        # print the html returned or something more intelligent to see if it's a successful login page.
        print(p.text)
        print(p.status_code)
        

        # An authorised request.
        # r = s.get('A protected web page url')
        # print r.text
        # etc... 


if __name__ == "__main__":
    main()
