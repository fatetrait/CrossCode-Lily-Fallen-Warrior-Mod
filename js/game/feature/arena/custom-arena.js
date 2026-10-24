ig.module("game.feature.arena.fallen-arena").requires("game.feature.arena.arena", "impact.feature.fallen-database").defines(function() {
	sc.ArenaFall = sc.Arena.extend({
		init: function() {
			this.parent("Arena");
			var d = ig.fallenDatabase.get("cups");
			console.log('a', d)
			d.forEach((b) => {
				for(var c in b) this.registerCup(c, b[c])
			})
			
		}
		
		
	});
	ig.addGameAddon(function() {
        return sc.arena = new sc.ArenaFall;
    });
});

ig.module("game.feature.menu.gui.arena.fallen-arena-list").requires("game.feature.menu.gui.arena.arena-list").defines(function() {
	sc.ArenaRoundListFall = sc.ArenaRoundList.extend({
            isRoundActive: function(a, b) {
                var prog =  b <= 0 || sc.arena.getCupProgress(a)
                    .rounds[b].cleared >= 1 ? true : sc.arena.getCupProgress(a)
                    .rounds[b - 1].cleared >= 1,
					condF = sc.arena.getCupData(a).rounds[b].condition || "true",
					cond = new ig.VarCondition(condF).evaluate();
				return prog && cond
            },
	});
});

ig.module("game.feature.menu.gui.arena.fallen-arena-menu").requires("game.feature.menu.gui.arena.arena-menu").defines(function() {
	sc.ArenaMenuFall = sc.ArenaMenu.extend({
            init: function() {
                this.parent();
				this.hook = new ig.GuiHook(this);
                this.parent(new sc.ArenaCupList, new sc.ArenaInfoBox);
                this.addChildGui(this.points);
                this.roundList = new sc.ArenaRoundListFall;
                this.roundList.setPos(8, 29);
                this.roundList.doStateTransition("HIDDEN", true);
                this.addChildGui(this.roundList)
			}

		
		
	});
});

sc.SUB_MENU_INFO[sc.MENU_SUBMENU.ARENA].Clazz = sc.ArenaMenuFall;