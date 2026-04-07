# 環境構築

## Vfoxを入れる

<https://github.com/version-fox/vfox?tab=readme-ov-file> に従って、

```sh
vfox
```

とできるまでやる。

## Node.jsを入れる

```sh
vfox add nodejs
vfox install nodejs@24
vfox use -p nodejs@24
```

確認。

```sh
node -v
npm -v
```

## その他

```sh
npm install -g serve npm-check-updates
```
