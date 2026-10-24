ig.module("impact.feature.fallen-database").requires("impact.base.loader", "game.config").defines(function() {
        ig.FallenDatabase = ig.SingleLoadable.extend({
            cacheType: "fallen-database",
            data: null,
            entries: {},
            register: function(b, a, d, c) {
                this.entries[b] = {
                    editor: a,
                    displayName: d || b
                };
                if(c) this.entries[b].external = {
                    path: c.path || null,
                    data: c.data
                }
            },
            get: function(b) {
                return this.data[b]
            },
            loadInternal: function() {
                $.ajax({
                    dataType: "json",
                    url: ig.root + "data/fallen-database.json" + ig.getCacheSuffix(),
                    context: this,
                    success: this.onload.bind(this),
                    error: this.onerror.bind(this)
                })
            },
            onerror: function(b) {
                this.data = {
                    error: b
                };
                this.loadingFinished(true)
            },
            onload: function(b) {
                this.data = b;
                console.log('aaa', this.data)
                this.loadingFinished(true);
                ig.JSON_LOG && ig.log("%cLOADABLE: %cLoaded fallen Database: \n%O", "color:#149AEB", "", b)
            }
        });
        ig.fallenDatabase = new ig.FallenDatabase
});