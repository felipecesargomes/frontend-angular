import { Component, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Animação jquery do menu retratil
    // Start Bootstrap - SB Admin v6.0.0
    // Copyright 2013-2020 Start Bootstrap
    // Licensed under MIT
    (function($) {
      "use strict";
  
      // Add active state to sidebar nav links
      var path = window.location.href;
      $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        // Usando 'as' para asserção de tipo
        const anchor = this as HTMLAnchorElement;
        if (anchor && anchor.href === path) {
          $(this).addClass("active");
        }
      });
  
      // Toggle the side navigation
      $("#sidebarToggle").on("click", function(e) {
          e.preventDefault();
          $("body").toggleClass("sb-sidenav-toggled");
      });
    })($);
  }

}
