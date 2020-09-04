const path = require('path')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const webpack = require('webpack')
function resolve(dir){
  return path.join(__dirname,'..',dir)
}





const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"), //antd包位置
  stylesDir: path.join(__dirname, "./src/style/theme"), //主题文件所在文件夹
  varFile: path.join(__dirname, "./src/style/theme/variables.less"), // 自定义默认的主题色
  mainLessFile: path.join(__dirname, "./src/style/theme/index.less"), // 项目中其他自定义的样式（如果不需要动态修改其他样式，该文件可以为空）
  outputFilePath: path.join(__dirname, "./public/color.less"), //提取的less文件输出到什么地方
  themeVariables: ["@primary-color","@border-color","@select-color"], //要改变的主题变量
  indexFileName: "./public/index.html", // index.html所在位置
  generateOnce: false // 是否只生成一次
}

const themePlugin = new AntDesignThemePlugin(options);

module.exports = {
  transpileDependencies: [
    'echarts',
    'resize-detector',
    'vue-baidu-map',
],
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/staven630/vue-cli4-config/tree/vue-cli3
  // webpack配置
  chainWebpack: (config) => {
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: [0.65, 0.9], speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    // })
    
    config
    .plugin('ignore')
    .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
    return config
  },
  configureWebpack: (config) => {
    const plugins =  [themePlugin]
  
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@p': path.resolve(__dirname, './src/views'),
        } // 别名配置 引用的地方减少路径的复杂度
      }
    })

    if (IS_PROD) {
        plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 0,
          minRatio: 0.8
        }),
        new webpack.ProvidePlugin({
          $:"jquery",
          
          jQuery:"jquery",
          "windows.jQuery":"jquery"
        })
      )
    }

    
         
    
    config.plugins = [...config.plugins, ...plugins]
    
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px',
        },
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true,
      }
    }
  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: true, // 是否打开浏览器
    host: "localhost",
    port: "8081", // 代理断就
    https: false,
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target:'http://192.168.20.120:8001', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
}
