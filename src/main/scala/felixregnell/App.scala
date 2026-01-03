package felixregnell

import felixregnell.pages.Router

import org.scalajs.dom
import org.scalajs.dom.{html}

object App:
  private val doc = dom.document

  // IDs
  private val appID = "app"
  private val navbarID = "app-navbar"
  private val bodyID = "root"

  // containers
  private val app = doc.getElementById(appID)
  private def navbar = doc.getElementById(navbarID)
  private def body = doc.getElementById(bodyID) 

  def newBody(): html.Element = 
    val body = doc.createElement("div").asInstanceOf[html.Element]
    body.id = bodyID
    // Style body?
    body

  private def newNavbar(): html.Element = 
    val navbar = doc.createElement("nav").asInstanceOf[html.Element]
    navbar.id = navbarID
    navbar.classList.add("sidebar")
    navbar

  def appendNavbar(link: Router.Link) = ??? // Might not need/want this method

  def replaceNavbar(links: Vector[Router.Link]) =
    val oldNavbar = doc.getElementById(navbarID)
    val navbar = newNavbar()
    Router.fillNavbar(navbar, links) 

    if (oldNavbar == null)
      app.appendChild(navbar)
    else 
      app.replaceChild(navbar, oldNavbar)

  def appendBody(toAppend: dom.Element) =
    body.appendChild(toAppend)

  def replaceBody(body: dom.Element) =
    require(body.id == bodyID)

    val oldBody = doc.getElementById(bodyID)
    if (oldBody == null)
      app.appendChild(body) 
    else 
      app.replaceChild(body, oldBody)

