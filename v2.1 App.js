Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',


    launch: function() {
      console.log('Start Code...');
      //this._loadData();
      this._loadIterations();
      console.log('...End Code');
    },


    // Load an Iteration combo box
    _loadIterations: function() {
        this.iterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox', {
            listeners: {
              ready: function(combobox) {
                this._loadData();
              },
              select: function(combobox, records) {
                this._loadData();
              },
              scope: this
            }
        });
        this.add(this.iterComboBox);
    },


    // Get data from CAAC
    _loadData: function(iterRef) {

      var selectedIterRef = this.iterComboBox.getRecord().get('_ref');

      console.log('selected iter', selectedIterRef);
      var myStore = Ext.create('Rally.data.wsapi.Store', {
          model: 'Defect',
          autoLoad: true,

          filters: [
              {
                  property: 'Iteration',
                  operation: '=',
                  value: selectedIterRef
              }
          ],
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
