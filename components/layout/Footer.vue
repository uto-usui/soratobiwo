<template>
  <footer class="footer">
    <p class="copyright">
      © soratobiwo
    </p>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  float: left;
  width: 100%;
  padding: 0 0 20px 0;
  text-align: center;
  background-color: #fff;
  //
  ul {
    margin-bottom: 8px;
  }

  li {
    display: inline-block;
    margin: 0 8px;
  }
}

.links-to-other-sites h1,
.links-to-other-sites h2,
.links-to-other-media h1,
.links-to-other-media h2 {
  display: inline;
}

.header-menu-follow {
  padding: 20px 0;
  text-align: center;
  //
  h2,
  h3 {
    margin-bottom: 0.6em;
    font-family: 'Vitesse A', 'Vitesse B', 'Helvetica Neue', Helvetica, Arial,
      YuGothic, 'Yu Gothic', 游ゴシック体, '游ゴシック', 'ヒラギノ角ゴ ProN W3',
      'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ Pro W3',
      'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, 'MS ゴシック', 'MS Gothic',
      sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: #4d4d4d;
    letter-spacing: 0.1em;
  }
  //
  p {
    margin-bottom: 1em;
    font-size: 1.2rem;
    color: #4d4d4d;
    letter-spacing: 0.06em;
  }
}

.header-menu-follow .social-follow-us-list li {
  display: inline-block;
  margin: 0 8px;
}

.links-to-condenast-site {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #4d4d4d;
  text-align: center;
  //
  @include touch {
    margin-right: 50px;
    margin-left: 50px;
    line-height: 19px;
  }
  //
  a {
    margin: 0 6px;
    white-space: nowrap;
  }
}

.links-to-other-sites {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #4d4d4d;
  text-align: center;
  //
  h2 {
    display: inline;
    font-size: 1.2rem;
    font-weight: bold;
  }
  //
  a {
    margin: 0 6px;
  }
}

.links-to-other-media {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #4d4d4d;
  text-align: center;
  //
  a {
    margin: 0 6px;
  }
}

.copyright {
  font-size: 1rem;
  color: #4d4d4d;
  text-align: center;
}

$icon-path: 'https://wired.jp/wp-content/themes/wired3/common/img/';

.icon-twitter {
  background-image: url(#{$icon-path}icon-twitter.svg);
}

.icon-facebook {
  background-image: url(#{$icon-path}icon-facebook.svg);
}

.icon-line {
  background-image: url(#{$icon-path}icon-line.svg);
}

.icon-rss {
  background-image: url(#{$icon-path}icon-rss.svg);
}

.icon-mail {
  background-image: url(#{$icon-path}icon-mail.svg);
}

[class^='icon'] {
  display: inline-block;
  width: 24px;
  height: 24px;
  font-size: 0;
  text-indent: -9999px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transition: opacity 0.2s ease-in-out;
}
</style>
