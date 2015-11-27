define(['jquery', 'Vue', 'datetimepicker', 'css!datetimepickerCSS'],
  function(jquery, Vue) {
    return Vue.component('date-picker', {
      replace: false,

      template: '<div class="input-group date">\n' +
        '<input type="text" class="form-control" />\n' +
        '<span class="input-group-addon">\n' +
        '  <span class="glyphicon glyphicon-calendar"></span>\n' +
        '</span>\n' +
        '</div>\n',

      data: function() {
        return {
        };
      },

      props: ['model'],

      ready: function() {
        var vueScope = this;
        var $datepicker = jquery(this.$el).find('.input-group.date');
        $datepicker.datetimepicker();
        $datepicker.data('DateTimePicker').date(this.$data.model);
        $datepicker.on('dp.change', function(date){
          vueScope.$set('model', date ? date.date.toDate() : null);
        });

        this.$watch('model', function(date){
          $datepicker.data('DateTimePicker').date(this.$data.model);
        });
      }
    });
  });
