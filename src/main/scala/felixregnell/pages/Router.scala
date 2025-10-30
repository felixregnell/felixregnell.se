package felixregnell.pages

import org.scalajs.dom
import org.scalajs.dom.{Event, window, html}

import scala.collection.immutable.HashMap


object Router:
  type Link = (id: String, name: String, path: String, page: () => dom.Element)
  val homePageLink: Link = (
    "home-page", 
    "Home ", 
    "/", 
    () => MainPage()
  ) 
  val expenseTrackerPageLink: Link = (
    "expense-tracker-page", 
    "Expense-Tracker", 
    "/expense-tracker", 
    () => ExpenseTrackerPage()
  )

  val links = Vector[Link](
    homePageLink,
    expenseTrackerPageLink 
  )
  
  def NavBar(): dom.Element = 
    val navBar = dom.document.createElement("nav").asInstanceOf[html.Element]
    navBar.id = "main-nav"
    navBar.classList.add("sidebar")

    for ((id, name, path, page) <- links)
      val link = dom.document.createElement("a").asInstanceOf[html.Anchor]
      link.id = id
      link.href = path
      link.textContent = name 
      link.addEventListener("click", (e: Event) => 
        e.preventDefault()
        e.stopPropagation()
        window.history.pushState(null, "", path)
        val app = dom.document.getElementById("app")
        app.innerHTML = "" 
        app.appendChild(page())

      ) 
      navBar.appendChild(link)

    return navBar