import { Component, NgZone, PLATFORM_ID, Inject,  Renderer2, ElementRef  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-threejs-try-line',
  templateUrl: './threejs-try-line.component.html',
  styleUrl: './threejs-try-line.component.sass'
})

export class ThreejsTryLineComponent
{
  renderer!: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera!: THREE.PerspectiveCamera;
  cube!: THREE.Mesh;
  points: THREE.Vector3[] = [];
  line!: THREE.Line;

  constructor(
                @Inject(PLATFORM_ID) private platformId: Object,
                private ngZone: NgZone,
                private renderer2: Renderer2,
                private el: ElementRef
            )
  {}

  ngAfterViewInit()
  {
    if (isPlatformBrowser(this.platformId))
    {
      this.ngZone.runOutsideAngular(() =>
      {
        if (this.isWebGLAvailable())  //webgl compatibility check
        {
          this.initThreeJS();
        }
        else
        {
          const warning = this.createWebGLErrorMessage();
          this.el.nativeElement.appendChild(warning);
        }
      });
    }
  }


  isWebGLAvailable(): boolean
  {
    try
    {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
      );
    }
    catch (e)
    {
      return false;
    }
  }

  initThreeJS()
  {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,
                   0.1, 1000);

    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Change to LineBasicMaterial for lines

    this.points.push( new THREE.Vector3( 10, 0, 0 ) );
    this.points.push( new THREE.Vector3( 0, 0, 0 ) );
    //this.points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.line = new THREE.Line( geometry, material );
    this.scene.add(this.line);

    this.camera.position.set( 0, 0, 100 );
    this.camera.lookAt( 0, 0, 0 );

    this.animate();
  }

  animate()
  {
    this.ngZone.runOutsideAngular(() =>
    {
        requestAnimationFrame(() => this.animate());

        this.renderer.render( this.scene, this.camera );
    });
  }

  createWebGLErrorMessage(): HTMLElement
  {
    const element = document.createElement('div');
    element.textContent = 'Your browser does not support WebGL.';
    return element;
  }
}
