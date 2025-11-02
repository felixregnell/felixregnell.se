package felixregnell.pages

import felixregnell.App

import scala.scalajs.js
import scala.scalajs.js.annotation.*

import org.scalajs.dom

val links = Vector[Router.Link](
  Router.homePageLink
) 

def loadExpenseTrackerPage(): Unit = 
  val body = App.newBody() 
  val text = dom.document.createTextNode("Dynamic Expense Tracker page")
  body.appendChild(text)
  // replace text with fetch-command, that fetches my React application
  App.replaceBody(body)
  App.replaceNavbar(links)
 
