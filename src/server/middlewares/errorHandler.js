const errorHandle = {
  error(app, logger) {
    // 500 容错
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        logger.error(error); // 错误日志要上报服务器，给用户展示一个错误的提示即可
        ctx.status = 500;
        ctx.body = '出错了~';
      }
    });

    // 404 容错
    app.use(async (ctx, next) => {
      await next();
      if(ctx.status != 404) {
        return;
      }

      // 大部分网站不承认网站 404，防止百度降权，会写成 200，然后写个网站丢失了
      ctx.status = 404; // 可以设置成404
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>'
    });
  }
};

module.exports = errorHandle;
