package felixregnell.pages

import scala.scalajs.js
import scala.scalajs.js.annotation.*

import org.scalajs.dom

// import javascriptLogo from "/javascript.svg"
@js.native @JSImport("/javascript.svg", JSImport.Default)
val javascriptLogo: String = js.native

def MainPage(): dom.Element = 
  val page = dom.document.createElement("div")
  val navBar = Router.NavBar() 
  val text = dom.document.createTextNode("This is the main page!")
  page.appendChild(navBar)
  page.appendChild(text)
  return page 

@main
def initMainPage(): Unit =
  val app = dom.document.getElementById("app")
  if(app == null) 
    throw new Error("naj")
  
  val mainPage = MainPage()
  app.appendChild(mainPage)
