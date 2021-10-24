<template>
    <div v-if="!preview" class="mathCompEdit">
        <form>
          Zakres a
          <input type="number" id="ax" v-model="ax" @change="updateChart()"><input type="number" id="ay" v-model="ay" @change="updateChart()"><input type="number" id="az" v-model="az" @change="updateChart()"><br>
          Zakres b
          <input type="number" id="bx" v-model="bx" @change="updateChart()"><input type="number" id="by" v-model="by" @change="updateChart()"><input type="number" id="bz" v-model="bz" @change="updateChart()"><br>
          <ul>
            <li v-for="element, index in this.data" :key="index">
              <div
                v-if="element.type === 'segment'"
                >
                Odcinek <br>
                <label>x<sub>1</sub> <input type="number" :value="element.segment.a.x" name="ax" v-bind:functionName="element.name" @change="onSegmentChange"></label>
                <label>y<sub>1</sub> <input type="number" :value="element.segment.a.y" name="ay" v-bind:functionName="element.name" @change="onSegmentChange"></label>
                <label>z<sub>1</sub> <input type="number" :value="element.segment.a.z" name="az" v-bind:functionName="element.name" @change="onSegmentChange"></label><br>
                <label>x<sub>2</sub> <input type="number" :value="element.segment.b.x" name="bx" v-bind:functionName="element.name" @change="onSegmentChange"></label>
                <label>y<sub>2</sub> <input type="number" :value="element.segment.b.y" name="by" v-bind:functionName="element.name" @change="onSegmentChange"></label>
                <label>z<sub>2</sub> <input type="number" :value="element.segment.b.z" name="bz" v-bind:functionName="element.name" @change="onSegmentChange"></label>
                <input type="color" v-bind:id="element.name">
              </div>
              <div
                v-if="element.type === 'function'"
                >
                Funkcja
                <input type="text" :value="element.formula" v-bind:functionName="element.name" @change="onFunctionChange">
                <input type="color" v-bind:id="element.name">
              </div>
            </li>
          </ul>
          <input type="button" value="Dodaj nowy odcinek" @click="addNewSegment">
          <input type="button" value="Dodaj nową funkcję" @click="addNewFunction">
        </form>
        <div id="container">
        </div>
    </div>
    <div v-else class="mathComp">
        <div id="container"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'MathComp',
  props: {
    data: Array,
    preview: Boolean
  },
  data() {
    return {
      ax: 20,
      ay: -20,
      az: 0,
      bx: -20,
      by: 20,
      bz: 0,
      min: {
        x: 0,
        y: 0,
        z: 0
      },
      max: {
        x: 0,
        y: 0,
        z: 0
      },
      timer: undefined
    }
  },
  watch: {
    func: function (f) {
      clearTimeout(this.timer)

      this.timer = setTimeout(() => this.drawFunction(f), 1000)
    },
  },
  methods: {
    addNewSegment: function () {
      const name = Math.floor((Math.random() * 100000) + 1)
      this.data.push({
        name,
        type: 'segment',
        color: '0x000000',
        segment: {
          a: { x: 0, y: 0, z: 0 },
          b: { x: 1, y: 2, z: 0 }
        }
      })
    },
    addNewFunction: function () {
      const name = Math.floor((Math.random() * 100000) + 1)
      this.data.push({
        name,
        type: 'function',
        formula: '',
        color: '0x000000'
      })
    },
    updateChart: function() {
      clearTimeout(this.timer)

      let tab = [[this.ax, this.ay, this.az], [this.bx, this.by, this.bz]]

      for (let point of tab) {
        if (point[0] > this.max.x) this.max.x = point[0]
        if (point[0] < this.min.x) this.min.x = point[0]
        if (point[1] > this.max.y) this.max.y = point[1]
        if (point[1] < this.min.y) this.min.y = point[1]
        if (point[2] > this.max.z) this.max.z = point[2]
        if (point[2] < this.min.z) this.min.z = point[2]
      }

      this.timer = setTimeout(() => this.drawChart(this.min.x, this.max.x, this.min.y, this.max.y, this.min.z, this.max.z, 0x000000), 1000)
    },
    init: function () {
      this.container = document.querySelector('#container')
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(this.container.clientWidth, this.container.clientWidth)
      this.container.appendChild(this.renderer.domElement)

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(100, this.container.clientWidth / this.container.clientHeight, 1, 500)
      this.camera.position.set(0, 0, 0)

      // Draw xyz axis
      this.updateChart()

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(0, 0, 0)
      this.controls.maxDistance = 300
      this.controls.update()

    },
    onWindowResize: function () {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize( this.container.clientWidth, this.container.clientWidth )
    },
    animate: function () {
      requestAnimationFrame(this.animate)

      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    },
    drawData: function (data) {
      if (!data)
        return console.log('No data')

      for (let draw of data) {
        if (draw.type == 'segment') {
          let array = [
            draw.segment.a.x, draw.segment.a.y, draw.segment.a.z,
            draw.segment.b.x, draw.segment.b.y, draw.segment.b.z
          ]
          this.drawLineSegments(array, draw.name, draw.color)
        } else if (draw.type == 'function') {
          this.drawFunction(draw.formula, draw.name, draw.color)
        } else {
          console.log('Unknown type')
        }
      }
    },
    onSegmentChange: function(e) {
      let name = e.target.attributes.functionName.value || ''
      let color = '0x' + document.getElementById(name).value.replace('#', '') || '0x00ff00'
      let segmentLetter = e.target.name.substring(0, 1)
      let axis = e.target.name.substring(1, 2)
      
      let segment = {}
      this.data.map(obj => {
        if (obj.name == name) {
          obj.segment[segmentLetter][axis] = e.target.value
          obj.color = color
          segment = obj.segment
          return obj
        }
      })
      let array = [
            segment.a.x, segment.a.y, segment.a.z,
            segment.b.x, segment.b.y, segment.b.z
          ]

      this.drawLineSegments(array, name, color)
    },
    onFunctionChange: function(e) {
      let name = e.target.attributes.functionName.value || ''
      let color = '0x' + document.getElementById(name).value.replace('#', '') || '0x00ff00'
      
      this.data.map(obj => {
        if (obj.name == name) {
          obj.formula = e.target.value
          obj.color = color
          return obj
        }
      })      

      this.drawFunction(e.target.value, name, color)
    },
    drawFunction: function (func, name = '', color = '0x00ff00' ) {
      let array = []
      const tFunctions = {
          "sin(x)": "Math.sin(x)",
          "cos(x)": "Math.cos(x)",
          "ctg(x)": "1 / Math.tan(x)",
          "tg(x)": "Math.tan(x)"
        }

      for (let key in tFunctions) {
        func = func.replace(key, tFunctions[key])
      }

      for (let x = this.min.x; x < this.max.x; x = x + 1/4) {
        try {
          let y = eval(func)

          array = [...array, x, y, 0]
        } catch (e) {
          //Something wrong with the formula
          break
        }
      }
      this.drawLines(array, name, color)
    },
    drawLines: function (array, name, color) {
      const geometry = new THREE.BufferGeometry()
      color = parseInt(color)
      name = name.toString()
      const material = new THREE.MeshBasicMaterial( { color } );
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(array), 3))

      let oldLine = this.scene.getObjectByName(name)
      if (oldLine) {
        this.scene.remove(oldLine)

        const line = new THREE.Line(geometry, material)
        line.name = name
        this.scene.add(line)
      } else {
        const line = new THREE.Line(geometry, material)
        line.name = name
        this.scene.add(line)
      }
    },
    drawLineSegments: function (array, name, color) {
      const geometry = new THREE.BufferGeometry()
      color = parseInt(color)
      name = name.toString()
      const material = new THREE.MeshBasicMaterial( { color } );
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(array), 3))

      let oldLine = this.scene.getObjectByName(name)
      if (oldLine) {
        this.scene.remove(oldLine)

        const line = new THREE.LineSegments(geometry, material)
        line.name = name
        this.scene.add(line)
      } else {
        const line = new THREE.LineSegments(geometry, material)
        line.name = name
        this.scene.add(line)
      }
    },
    drawChart: function (minX, maxX, minY, maxY, minZ, maxZ, color) {
      this.camera.position.set(0, 0, maxX)

      this.chartGeometry = new THREE.BufferGeometry()
      const material = new THREE.MeshBasicMaterial( { color } );
      this.chartGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        minX, 0, 0,
        maxX, 0, 0,
        0, minY, 0,
        0, maxY, 0,
        0, 0, minZ,
        0, 0, maxZ
      ]), 3))

      const line = new THREE.LineSegments(this.chartGeometry, material)
      this.scene.add(line)

      for (let i = minX; i < maxX; i++) {
        const material = new THREE.LineBasicMaterial( { color: 0x000000 } )
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3( i, 1/4, 0 ),
          new THREE.Vector3( i, -1/4, 0 )
        ])

        const line = new THREE.Line( geometry, material )
        this.scene.add(line)
      }

      for (let i = minY; i < maxY; i++) {
        const material = new THREE.LineBasicMaterial( { color: 0x000000 } )
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3( 1/4, i, 0 ),
          new THREE.Vector3( -1/4, i, 0 )
        ])

        const line = new THREE.Line( geometry, material )
        this.scene.add(line)
      }
    }
  },
  created() {
    window.addEventListener('resize', this.onWindowResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.onWindowResize)
  },
  mounted() {
    this.init()
    this.drawData(this.data)
    this.animate()
  }
}
</script>

<style scoped>
    form {
      padding: 20px;
    }

    div.mathCompEdit form input {
        font-family: 'Montserrat', sans-serif;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 1rem;
        border: none;
        padding: 3px 6px;
        margin: 4px 2px;
        outline: none;
        border: 1px solid #ccc;
    }

    div.mathCompEdit form input[type=button] {
      padding: 6px 10px;
      transition: background-color .2s ease;
    }

    div.mathCompEdit form input[type=button]:hover {
      background-color: #ddd;
      transition: background-color .2s ease;
    }

    div.mathCompEdit form input[type=color] {
        border: none;
        outline: none;
        background: none;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    sub {
      vertical-align: sub;
      font-size: smaller;
    }
</style>