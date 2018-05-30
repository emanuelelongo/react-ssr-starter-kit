export default function(options) {
    if(process.env.NODE_ENV !== 'development') {
        return;
    }
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(options.watchDir);

    watcher.on('all', () => {
        Object.keys(require.cache).forEach((id) => {
            if (options.modulesToReload.test(id)) { 
                delete require.cache[id];
            }
        });
        options.callback()
    });
}
