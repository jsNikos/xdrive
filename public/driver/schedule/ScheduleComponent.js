define(['text!schedule/schedule.html'], function(scheduleHtml){
  return ScheduleComponent;

  function ScheduleComponent(){
    this.template = scheduleHtml;
    this.data = undefined;
    this.methods = {};
  }
});
