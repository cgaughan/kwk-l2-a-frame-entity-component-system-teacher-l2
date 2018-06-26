// a reference to the enclosing scene element.
// We will append newly made spheres directly to this.
const SCENE = document.querySelector('a-scene')

// a few random starting positions we can use to make spheres.
const startPositions = [
  [-3, -2, -4],
  [-1, 5, 2],
  [4, -5, -1],
  [2, 3, 5]
]

const colors = [
  "red",
  "blue",
  "yellow",
  "pink"
]

// removes and returns a random element from an array
function sample(arr) {
  const randIdx = Math.floor(Math.random() * arr.length)
  const value = arr[randIdx]
  arr.splice(randIdx, 1)
  return value
}

function addEntityToScene(entity) {
  SCENE.appendChild(entity)
}

function createSphere() {
  const newSphere = document.createElement('a-sphere')
  const color = sample(colors)
  const coords = sample(startPositions) //DO NOT NEED .join(' ') because it groups all the spheres together as one entity
  newSphere.setAttribute("radius", Math.ceil(Math.random() * 3))
  newSphere.setAttribute("color", color)
  newSphere.setAttribute("position", coords)
  return [newSphere, coords] //add coords because it tells where the "random" spheres to go
}

function addBobAnimationToElement(el, coord) {
  const newAnim = document.createElement('a-animation')
  newAnim.setAttribute("attribute", "position")
  newAnim.setAttribute("repeat", "indefinite")
  newAnim.setAttribute("from", [coord[0], coord[1] - 1, coord[2]].join(" "))
  newAnim.setAttribute("to", [coord[0], coord[1] + 1, coord[2]].join(" "))
  newAnim.setAttribute("easing", "ease")
  newAnim.setAttribute("direction", "alternate")
  newAnim.setAttribute("dur", "2000")
  el.appendChild(newAnim)
  return el
}

function createSpheres() {
  x = 4
  while (x > 0) {
    setTimeout(() => {
      let [el, coords] = createSphere()
      el = addBobAnimationToElement(el, coords)
      addEntityToScene(el)
    }, Math.random() * 2500)
    x--
  }
}

createSpheres()
