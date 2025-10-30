
package felixregnell.pages

import scala.scalajs.js
import scala.scalajs.js.annotation.*

import org.scalajs.dom

def ExpenseTrackerPage(): dom.Element = 
  val page = dom.document.createElement("div")
  val navBar = Router.NavBar() 
  val text = dom.document.createTextNode("This is not the main page!")
  page.appendChild(navBar)
  page.appendChild(text)
  return page
 
