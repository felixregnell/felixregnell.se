package felixregnell.pages

import org.scalajs.dom
import org.scalajs.dom.{Event, window, html}

import scala.collection.immutable.HashMap

object Router:
  type Link = (
    id: String, 
    name: String, 
    nameIsSVGPath: Boolean,
    path: String, 
    loadPage: () => Unit
  )

  val homePageLink: Link = (
    "home-page", 
    "/home-alt-svgrepo-com.svg", 
    true,
    "/", 
    () => loadMainPage()
  ) 
  val expenseTrackerPageLink: Link = (
    "expense-tracker-page", 
    "Expense-Tracker", 
    false,
    "/expense-tracker", 
    () => loadExpenseTrackerPage()
  )

  val links = Vector[Link](
    homePageLink,
    expenseTrackerPageLink 
  )
  
  def fillNavbar(navbar: html.Element, links: Vector[Link]): Unit = 
    for ((id, name, nameIsSVGPath, path, loadPage) <- links)
      val link = dom.document.createElement("a").asInstanceOf[html.Anchor]
      link.id = id
      link.href = path
      if (nameIsSVGPath)
        val img = dom.document.createElement("img").asInstanceOf[html.Image]
        img.src = name
        img.classList.add("logo")
        link.appendChild(img)
      else 
        link.textContent = name 

      link.addEventListener("click", (e: Event) => 
        e.preventDefault()
        e.stopPropagation()
        // if current state already path - do nothing
        window.history.pushState(null, "", path)
        loadPage()
      ) 
      navbar.appendChild(link)
