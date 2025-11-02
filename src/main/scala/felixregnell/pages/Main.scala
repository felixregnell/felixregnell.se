package felixregnell.pages

import felixregnell.App

import scala.scalajs.js
import scala.scalajs.js.annotation.*

import org.scalajs.dom
import org.scalajs.dom.{html}

val mainPage = App.newBody()
val links = Vector[Router.Link](
  Router.expenseTrackerPageLink
) 

def loadMainPage(): Unit = 
  App.replaceBody(mainPage)
  App.replaceNavbar(links)
 
@main
def initMainPage(): Unit =
  val text = dom.document.createTextNode("Static Main page")
  mainPage.appendChild(text)
  App.replaceNavbar(Router.links)
  loadMainPage()