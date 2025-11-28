package felixregnell.pages

import felixregnell.App

import org.scalajs.dom

import scala.scalajs.js
import scala.scalajs.js.annotation.*

@JSImport("expense-tracker", JSImport.Default)
@js.native
val mountExpenseTracker: js.Function1[org.scalajs.dom.Element, Unit] = js.native

val links = Vector[Router.Link](
  Router.homePageLink
) 

def loadExpenseTrackerPage(): Unit = 
  val body = App.newBody()
  mountExpenseTracker(body)
  App.replaceBody(body)
  App.replaceNavbar(links)
 
