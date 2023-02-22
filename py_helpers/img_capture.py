import tkinter as tk
from tkinter import *
import pyautogui
import webbrowser
from tkinter import ttk, messagebox
from datetime import datetime
import os


class Application():
    def __init__(self) -> None:

        self.bg = "#00203F"
        self.fg = "#ADEFD1"

        self.ashtak_number_count = 8
        self.img_count = 1

        self.main_window = self.createWindow("Image Capture")
        self.main_window.config(bg=self.bg)
        self.main_window.resizable(0,0)


        self.title = tk.Label(self.main_window, text="Image Capture", font=("HELVETICA",28,"bold"),bg=self.bg,fg=self.fg)
        self.title.grid(row=0,column=0,sticky=N,pady=(40,20),padx=40)

        self.desc = tk.Label(self.main_window, text=f"Current Image: {self.img_count}",font=("ARIAL",12),bg=self.bg,fg=self.fg)
        self.desc.grid(row=1,column=0,padx=5, pady=5)

        self.desc2 = tk.Label(self.main_window, text=f"Current Ashtak: {self.ashtak_number_count}",font=("ARIAL",12),bg=self.bg,fg=self.fg)
        self.desc2.grid(row=2,column=0,padx=5, pady=5)

        self.snip_button = tk.Button(self.main_window,text="Add new image", font=("TIMES NEW ROMAN",14),bg=self.fg,fg=self.bg, height = 2, width = 12, command = self.snipImage, bd=7, relief=RAISED)
        self.snip_button.grid(row=3,column=0, pady=15,padx=20)

        self.snip_button2 = tk.Button(self.main_window,text="Next Ashtak", font=("TIMES NEW ROMAN",14),bg=self.fg,fg=self.bg, height = 2, width = 12, command = self.nextAshtak, bd=7, relief=RAISED)
        self.snip_button2.grid(row=4,column=0, pady=15,padx=20)

        #bring to front
        self.raise_above_all(self.main_window)
    
    def nextAshtak(self):
        self.ashtak_number_count += 1
        self.desc2.config(text=f"Current Ashtak: {self.ashtak_number_count}")

        self.img_count = 1
        self.desc.config(text=f"Current Image: {self.img_count}")
    
 


    def startMainLoop(self):
        """ Driver method """
        self.main_window.mainloop()

    #widget creation method
    def createWindow(self,title):
        window = tk.Tk()
        window.title(title)
        window.geometry("")
        return window

    def takeBoundedScreenShot(self, x1, y1, x2, y2):

        folderPath = f'ap2/ashtak-pustika2-{self.ashtak_number_count}'
        
        isExist = os.path.exists(folderPath)
        if not isExist:
            os.makedirs(folderPath)
    
        img_nam = f"{folderPath}/{self.img_count}.png"
        im = pyautogui.screenshot(region=(x1, y1, x2, y2))
        im.save(img_nam)
        self.img_count+=1
        self.desc.config(text=f"Current Image: {self.img_count}")

    def snipImage(self):
        self.rect = None
        self.x = self.y = 0
        self.start_x = None
        self.start_y = None
        self.curX = None
        self.curY = None
        
        self.master_screen = Toplevel(self.main_window)
        self.master_screen.withdraw()
        self.master_screen.attributes("-transparent", "blue")
        self.picture_frame = Frame(self.master_screen, background = "blue")
        self.picture_frame.pack(fill=BOTH, expand=YES)
        
        self.master_screen.deiconify()
        self.main_window.withdraw()

        self.screenCanvas = Canvas(self.picture_frame, cursor="cross", bg="grey11")
        self.screenCanvas.pack(fill=BOTH, expand=YES)

        self.screenCanvas.bind("<ButtonPress-1>", self.on_button_press)
        self.screenCanvas.bind("<B1-Motion>", self.on_move_press)
        self.screenCanvas.bind("<ButtonRelease-1>", self.on_button_release)

        self.master_screen.attributes('-fullscreen', True)
        self.master_screen.attributes('-alpha', .3)
        self.master_screen.lift()
        self.master_screen.attributes("-topmost", True)

    def on_button_release(self, event):

        if self.start_x <= self.curX and self.start_y <= self.curY:
            self.takeBoundedScreenShot(self.start_x, self.start_y, self.curX - self.start_x, self.curY - self.start_y)

        elif self.start_x >= self.curX and self.start_y <= self.curY:
            self.takeBoundedScreenShot(self.curX, self.start_y, self.start_x - self.curX, self.curY - self.start_y)

        elif self.start_x <= self.curX and self.start_y >= self.curY:
            self.takeBoundedScreenShot(self.start_x, self.curY, self.curX - self.start_x, self.start_y - self.curY)

        elif self.start_x >= self.curX and self.start_y >= self.curY:
            self.takeBoundedScreenShot(self.curX, self.curY, self.start_x - self.curX, self.start_y - self.curY)

        self.master_screen.withdraw()

        messagebox.showinfo("Done!", "Screenshot Saved!")

        self.main_window.deiconify()
        return event

    def on_button_press(self, event):
        # save mouse drag start position
        self.start_x = self.screenCanvas.canvasx(event.x)
        self.start_y = self.screenCanvas.canvasy(event.y)

        self.rect = self.screenCanvas.create_rectangle(self.x, self.y, 1, 1, outline='#FBFCFC', width=2, fill="blue")

    def on_move_press(self, event):
        self.curX, self.curY = (event.x, event.y)
        # expand rectangle as you drag the mouse
        self.screenCanvas.coords(self.rect, self.start_x, self.start_y, self.curX, self.curY)

    def raise_above_all(self, window):
        """ brings window to the front """
        window.attributes('-topmost', 1)
        window.attributes('-topmost', 0)


    def eex(self):
        self.main_window.destroy()
        sys.exit()

app = Application()
app.startMainLoop()
