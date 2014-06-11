define(["mvc/dataset/hda-model","mvc/dataset/hda-base"],function(b,a){var c=a.HistoryContentBaseView.extend({className:"dataset hda history-panel-hda",id:function(){return"hdca-"+this.model.get("id")},initialize:function(d){if(d.logger){this.logger=this.model.logger=d.logger}this.log(this+".initialize:",d);this.selectable=d.selectable||false;this.selected=d.selected||false;this.expanded=d.expanded||false},render:function(e){var d=this._buildNewRender();this._queueNewRender(d,e);return this},templateSkeleton:function(){return['<div class="dataset hda">','<div class="dataset-warnings">',"<% if ( deleted ) { %>",'<div class="dataset-deleted-msg warningmessagesmall"><strong>',_l("This dataset has been deleted."),"</div>","<% } %>","<% if ( ! visible ) { %>",'<div class="dataset-hidden-msg warningmessagesmall"><strong>',_l("This dataset has been hidden."),"</div>","<% } %>","</div>",'<div class="dataset-selector"><span class="fa fa-2x fa-square-o"></span></div>','<div class="dataset-primary-actions"></div>','<div class="dataset-title-bar clear" tabindex="0">','<span class="dataset-state-icon state-icon"></span>','<div class="dataset-title">','<span class="hda-hid"><%= hid %></span> ','<span class="dataset-name"><%= name %></span>',"</div>","</div>",'<div class="dataset-body"></div>',"</div>"].join("")},templateBody:function(){return['<div class="dataset-body">','<div class="dataset-summary">',"A dataset collection.","</div>"].join("")},_buildNewRender:function(){var d=$(_.template(this.templateSkeleton(),this.model.toJSON()));d.find(".dataset-primary-actions").append(this._render_titleButtons());d.children(".dataset-body").replaceWith(this._render_body());this._setUpBehaviors(d);return d},_render_titleButtons:function(){return[]},_render_body:function(){var e=$('<div>Error: unknown state "'+this.model.get("state")+'".</div>'),d=this["_render_body_"+this.model.get("state")];if(_.isFunction(d)){e=d.call(this)}this._setUpBehaviors(e);if(this.expanded){e.show()}return e},_setUpBehaviors:function(d){d=d||this.$el;make_popup_menus(d);d.find("[title]").tooltip({placement:"bottom"})},events:{"click .dataset-title-bar":"toggleBodyVisibility","keydown .dataset-title-bar":"toggleBodyVisibility","click .dataset-selector":"toggleSelect"},expandBody:function(){var d=this;function e(){d.$el.children(".dataset-body").replaceWith(d._render_body());d.$el.children(".dataset-body").slideDown(d.fxSpeed,function(){d.expanded=true;d.trigger("body-expanded",d.model.get("id"))})}e()},collapseBody:function(){var d=this;this.$el.children(".dataset-body").slideUp(d.fxSpeed,function(){d.expanded=false;d.trigger("body-collapsed",d.model.get("id"))})},_render_body_ok:function(){var d=$(_.template(this.templateBody(),this.model.toJSON()));if(this.model.get("deleted")){return d}return d}});return{DatasetCollectionBaseView:c}});