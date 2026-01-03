package felixregnell.pages

import felixregnell.App

import org.scalajs.dom

import scala.scalajs.js
import scala.scalajs.js.annotation._
import scala.scalajs.js.Thenable
import scala.concurrent.ExecutionContext.Implicits.global


@JSImport("react", JSImport.Namespace)
@js.native object React extends js.Object

@JSImport("react-dom", JSImport.Namespace)
@js.native object ReactDOM extends js.Object

def loadExpenseTracker(): Thenable[js.Dynamic] =
  js.`import`("/expensetracker/dist/expense-tracker.js")
  // SWAP TO: fetch data from server instead of weird mixed build

val links = Vector[Router.Link](
  Router.homePageLink
) 

def loadExpenseTrackerPage(): Unit = 
  val body = App.newBody()
  loadExpenseTracker().toFuture foreach { mod =>
    val mount = mod.default
    App.replaceBody(body)
    App.replaceNavbar(links)
    mount(body)
  }
 
