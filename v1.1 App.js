Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
      // Write code below
      console.log('Start Code...');

      // Get data from CAAC
      var myStore = Ext.create('Rally.data.wsapi.Store', {
          model: 'User Story',
          autoLoad: true,
          listeners: {
              load: function(myStore, myData, success) {
                console.log('Got data!', myStore, myData, success);


                // Create and populate a grid
                var myGrid = Ext.create('Rally.ui.grid.Grid', {
                  store: myStore,
                  columnCfgs: [
                    'FormattedID', 'Name', 'ScheduleState'
                  ]
                });
                console.log('My grid', myGrid);
                this.add(myGrid);
                console.log('What is this?', this);

              },
              scope: this
          },
          fetch: ['FormattedID', 'Name', 'ScheduleState']
      });

      console.log('...End Code');
      // Write code above
    }
});
