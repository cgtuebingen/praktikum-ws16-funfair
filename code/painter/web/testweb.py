#!/usr/bin/env python

import requests


def main():


    url = 'https://deepart.io/login/'

     # Fill in your details here to be posted to the login form.
    payload = {
        'email': 'rgeirhos@web.de',
        'password': 'tiferkunschd'
    }

    
    # Use 'with' to ensure the session context is closed after use.
    with requests.Session() as c:

        # p = c.post(url, data=payload, verify=False)

        c.get(url, verify = False)
        
        # grab cookie
        csrftoken = c.cookies["csrftoken"]
        
        login_data = dict(csrfmiddlewaretoken = csrftoken,
                          email = 'rgeirhos@web.de',
                          password = 'tiferkunschd')

        c.post(url,
               data = login_data,
               headers = {"Referer": "https://www.deepart.io/"},
               verify = False)

        page = c.get("https://deepart.io/image/submissions/",
                     verify = False)
        print(page.content)


        # print the html returned or something more intelligent to see if it's a successful login page.
        #print(p.text)
        

        # An authorised request.
        # r = s.get('A protected web page url')
        # print r.text
        # etc... 


if __name__ == "__main__":
    main()
