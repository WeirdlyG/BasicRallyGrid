Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',


    launch: function() {
      console.log('Start Code...');
      this._loadData();
      console.log('...End Code');
    },


    // Get data from CAAC
    _loadData: function() {

      var myStore = Ext.create('Rally.data.wsapi.Store', {
          model: 'Defect',
          autoLoad: true,
          listeners: {
              load: function(myStore, myData, success) {
                console.log('Got data!', myStore, myData, success);
                this._loadGrid(myStore);
              },
              scope: this
          },
          fetch: ['FormattedID', 'Name', 'Severity', 'Iteration']
      });
    },


    // Create and populate a grid of Stories
    _loadGrid: function(myStoryStore) {
      var myGrid = Ext.create('Rally.ui.grid.Grid', {
        store: myStoryStore,
        columnCfgs: [
          'FormattedID', 'Name', 'Severity', 'Iteration'
        ]
      });
      this.add(myGrid);
    }


});
