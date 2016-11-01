Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    myStore: undefined,
    myGrid: undefined,

    launch: function() {
      console.log('Start Code...');

      // Create a container for the pulldowns (drop-downs)
      this.pulldownContainer = Ext.create('Ext.container.Container',{
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
      });

      this.add(this.pulldownContainer);
      id: 'pulldown-container-id',
      this._loadIterations();
      console.log('...End Code');
    },


    // Load an Iteration combo box
    _loadIterations: function() {
        this.iterComboBox = Ext.create('Rally.ui.combobox.IterationComboBox', {
            listeners: {
              ready: function(combobox) {
                this._loadSeverities();
              },
              select: function(combobox, records) {
                this._loadData();
              },
              scope: this
            }
        });
        this.pulldownContainer.add(this.iterComboBox);
    },


    // Load a Severity combo box
    _loadSeverities: function() {
        this.severityComboBox = Ext.create('Rally.ui.combobox.FieldValueComboBox', {
            model: 'Defect',
            field: 'Severity',
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
      this.pulldownContainer.add(this.severityComboBox);
    },


    // Get data from CAAC
    _loadData: function() {

      var selectedIterRef = this.iterComboBox.getRecord().get('_ref');
      var selectedSeverityValue = this.severityComboBox.getRecord().get('value');

      // Create an array of filters
      var myFilters = [
          {
              property: 'Iteration',
              operation: '=',
              value: selectedIterRef
          },
          {
              property: 'Severity',
              operation: '=',
              value: selectedSeverityValue
          }
      ];

      // If store exists, just load new data
      if (this.defectStore) {
        this.defectStore.setFilter(myFilters);
        this.defectStore.load();

      // Create new store
      } else {

        this.defectStore = Ext.create('Rally.data.wsapi.Store', {
            model: 'Defect',
            autoLoad: true,
            filters: myFilters,
            listeners: {
                load: function(myStore, myData, success) {
                  console.log('Got data!', myStore, myData, success);

                  // Call createGrid function if the grid hasn't already been created
                  if (!this.myGrid) {
                    this._createGrid(myStore);
                  }
                },
                scope: this
            },
            fetch: ['FormattedID', 'Name', 'Severity', 'Iteration']
        });
      }
    },


    // Create and populate a grid of Stories
    _createGrid: function(myStoryStore) {
      console.log('Create grid');
      this.myGrid = Ext.create('Rally.ui.grid.Grid', {
        store: myStoryStore,
        columnCfgs: [
          'FormattedID', 'Name', 'Severity', 'Iteration'
        ]
      });
      this.add(this.myGrid);
    }


});
