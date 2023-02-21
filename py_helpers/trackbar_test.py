import numpy as np
import cv2 as cv


def nothing(x):
    pass

img = cv.imread("ap1/ashtak-pustika1-20/1.png")
img = cv.cvtColor(img, cv.COLOR_RGB2GRAY)
cv.namedWindow('image')
cv.namedWindow('original')


# cv.createTrackbar('blur','image',0,16,nothing) #ok
# cv.createTrackbar('blockSize','image',52,255,nothing) #ok 51/55
# cv.createTrackbar('constant','image',14,255,nothing) ## 21 or 15
# cv.createTrackbar('maxVal','image',0,255,nothing)

## 40 29 1 
## 60 25 0


cv.createTrackbar('alpha','image',15,30,nothing)
cv.createTrackbar('beta','image',10,100,nothing)


def getValue(val):
    if val % 2 == 0:
        val += 1
    return val

while(1):

    # blur = getValue(cv.getTrackbarPos('blur','image'))
    # blockSize = getValue(cv.getTrackbarPos('blockSize','image'))
    # constant = getValue(cv.getTrackbarPos('constant','image'))
    # maxVal = cv.getTrackbarPos('maxVal','image')

    # blured_img = cv.GaussianBlur(img, (blur, blur), 0)

    # adaptive_img = cv.adaptiveThreshold(blured_img, maxVal, cv.ADAPTIVE_THRESH_GAUSSIAN_C, 
    #     cv.THRESH_BINARY, blockSize, constant)

    alpha = getValue(cv.getTrackbarPos('alpha','image')) / 10
    beta = getValue(cv.getTrackbarPos('beta','image'))

    adjusted = cv.convertScaleAbs(img, alpha=alpha, beta=beta)

    cv.imshow('image',adjusted)
    cv.imshow('original',img)
    

    k = cv.waitKey(50) & 0xFF
    if k == 27:
        break


cv.destroyAllWindows()