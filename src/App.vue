<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    margin: 0 !important;
    font-family: 'Montserrat', sans-serif;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #nprogress .bar {
    background: #2ecc71 !important;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px #2ecc71, 0 0 5px #2ecc71 !important;
  }

  #nprogress .spinner-icon {
    border-top-color: #2ecc71 !important;
    border-left-color: #2ecc71 !important;
  }

  code { 
    border-radius: 10px;
    line-height: 18px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
