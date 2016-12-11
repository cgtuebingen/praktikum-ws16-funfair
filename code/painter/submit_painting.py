import requests
import urllib
import time
import sys

STYLE = "1"
IMAGE_PATH = "lena.jpg"
OUTPUT_PATH = "res.jpg"

def paint_image(style=STYLE, image_path=IMAGE_PATH,
                      output_path=OUTPUT_PATH):
    r = requests.post('http://turbo.deepart.io/api/post/',
                       data={'style': style,
                             'return_url': 'http://my.return/' },
                       files={ 'input_image': ( 'file.jpg', open(image_path, 'rb'),
                               'image/jpeg' ) } )
    img=r.text
    link=("http://turbo.deepart.io/media/output/%s.jpg" % img)
    print link
    time.sleep(1)
    urllib.urlretrieve(link, output_path)

if __name__ == "__main__":

    nonexistent = [2, 3, 4, 5, 7, 9, 11, 13, 14, 18, 20, 29, 44, 46]
    for i in range(1, 47):
        if i not in nonexistent:
            paint_image(str(i),
                        IMAGE_PATH,
                        "styles/lena_"+str(i)+".jpg")

