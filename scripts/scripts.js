/*For Alert debugging in Mobile*/
if(developerMode == true){
	window.onerror = function(msg, url, linenumber) {
		var tbl ='<style>table td {text-align: left;}</style>';
		tbl += '<table><tr><td><b>Error message:</b></td><td>'+msg+'</td></tr>';
		tbl += '<tr><td><b>URL:</b></td><td>'+url+'</td></tr>';
		tbl += '<tr><td><b>Line Number:</b></td><td>'+linenumber+'</td></tr></table>';
		error(tbl,"Error!");
		return true;
	}
}
/*
 *
 *  FUNCTION NAME : loading
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : December 17, 2013 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show/hide loader
 *  PARAMETERS    : showOrHide
 *
 */
function loading(showOrHide,text) {
	if(text){
		var textVis = true;
	}else{
		var textVis = false;
	}
	setTimeout(function(){
		if(showOrHide == "show"){
			$("body").addClass('ui-disabled');
		}else{
			$("body").removeClass('ui-disabled');
		}
//        $.mobile.loading(showOrHide);
		$.mobile.loading(showOrHide, {
			text: text,
			textVisible: textVis,
			theme: "z",
			html: ""
		});
	}, 1); 
}

var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));
var globalLoginFlag = 0;
var globalDomainArray = new Array();
var globalResourceDomain= "";

function toConfig(){
	setTimeout(function(){
		$.mobile.changePage( $("#configEditorPage"), {
			transition: "flow",
			reverse: false,
			changeHash: true
		});
	},400);
	loading('hide');
}

$(document).ready(function() {	
	loadLogin();
	$(document).on('pagebeforeshow', '.ui-dialog', function (e, ui) {
		$("#divMenuButton").removeClass("menuShow").addClass("menuHide").hide();
	});

	$(document).on('pagebeforehide', '.ui-dialog', function (e, ui) {
		$("#divMenuButton").addClass("menuHide").show();
	});

});

/*Signout*/
$(document).on('click', '#logOut', function() {
	signout();
});

/* show DOMAIN NAME */
var clickbutDom = true;
$(document).on('click', '#triggerDomain', function() {
	if (clickbutDom == true){
		$("#panel3").hide();
		clickbutDom =false;
	}else if (clickbutDom == false){
		$("#configText").empty().append(Name);
		$("#panel3").show();
		 //		$("#panel3").addClass('trigger2 left');
		//		$("#panel3").css({"position": "absolute","opacity": "0.9","display": "block"});
		clickbutDom=true;
	}
});

/* SHOW HIDE CONFIGURATION NAME */
var glo = false;
$(document).on('click', '#trigger2', function() {
	if (glo == false && Name!=""){
		$("#configText").empty().append(Name);
		$("#panel2").show();
		$("#panel2").addClass('trigger right');
		$("#panel2").css({"position": "absolute","opacity": "0.9","display": "block"});
		glo =true;
	}else if (glo == true){
		$("#panel2").hide();
		glo=false;
	}
});
		/* POPUP FOR EDIT CONFIGURATION NAME */
		$(document).on('dblclick', '#confi', function() {
			$.mobile.changePage($('#editConfigName'),{
				 transition: "pop",
				  changeHash: false
			},1500);	
			var n = Name.split(".");
			$('#txtConfigName').val(n[0]);
		});
		$(document).on('click', "#okEditConfig", function() {
			var text = $("#txtConfigName").val();
				if ($.trim(text)==''){
					alert('Space are not allowed.');
						return false;
				}
				Name = text+".stat";
				$('#txtConfigName').val(Name);
				$('#configText').empty().append(Name);
				$.mobile.changePage( $("#configEditorPage"), {
					  transition: "pop",
					  reverse: false,
					  changeHash: true
				});
		});
		$(document).on('click', '#cancelEditConfig', function() {
			$.mobile.changePage($('#configEditorPage'),{
				 transition: "pop",
				  changeHash: true
			},1500);	
			$('#txtConfigName').val(Name);
		});
		$(document).on("pageinit", "#OpenConsole", function(){
			initDialog();
			$("#divConsole").load("pages/ConfigEditor/OpenConsole.html", function(){
			var str="";
				 for (var i =0; i<devicesArr.length;i++){
					 str+="<li><a href='#consoledevice'>"+deviceArr[i].DeviceName+"</a></li>";
					 if (deviceArr[i].Status != "Reserved"){
							error ("Need to commit first");
						  return
					 }
				 }
				getOnlineUsers();
				showGroupName();
				$("#ulchat").empty().append(str);
				$('#tabsConsoleContent').tabs();
				$('#tabsConsole').tabs();
				$("#tabsChatContent").tabs();
				setTimeout(function(){
					$('.ui-state-default').removeClass('ui-block-a');
					$('.ui-state-default').removeClass('ui-block-b');
					$('.ui-state-default').removeClass('ui-block-c');
					$('.ui-state-default').removeClass('ui-block-d');
					$('.ui-state-default').removeClass('ui-block-e');

				},1000);
				
				$('#OpenConsole').trigger('create');
				
				$('.ui-dialog-contain').css({"width":"1000px;"});
	});	
	$(document).on("keypress", "#consoletext",function(){
		deviceSession(event,this.value);
	});
	$(document).on("keypress", "#textLogs",function(){
		chatSession(event,this.value);
	});
	$(document).on("click", "#liChat",function(){
		getOnlineUsers();
	});
	$(document).on("click", "#createGroup",function(){
		createGroup();
	});
	$(document).on("click", ".addtogroup",function(){
		addUserToGroup();
	});
	$(document).on("click", "#saveGroup",function(){
		saveGroup();
	});
	$(document).on("keyup", "#SearchUser",function(){
		console.log('keyup');
		searchUser();
	});
	$(document).on("keyup", "#deleteUserFromGroup",function(){
		console.log('keyup');
		deleteSelectedUser();
	});
	$(document).on("keyup", ".checkboxdeleteuser",function(){
		console.log('keyup');
		
	});
	$(document).on("click", ".activeUser",function(){
		globalReciever = $(this).text();
		loadChatSession();
		$('#recieverUserName').html(globalReciever);
	});
	$(document).on("click", "#enableChatSession",function(){
		$('#ChatSession').toggle();
	});
	$(document).on("click", "#enableGroupsOption",function(){
		$('#createdgroups').toggle();
	});
	$(document).on("click", "#enableOtherOption",function(){
		$('#otherOptions').toggle();
	});
});

/*##########################################################################################################################*/
/*Menu animation*/
/*$(document).on('click', '.configCar', function() {
    $(".configCar").addClass('animated wobble');
    setTimeout(function(){
    	$(".configCar").removeClass('animated wobble');
    	$.mobile.changePage($('#configDialog'),{
    		transition: "pop"
    	});
    },1500);
});*/
/*$(document).on('dblclick', 'div[data-role="content"]', function() {
	if($("#configFooter").attr("style") == "display: block;" || $("#configFooter").attr("style") == ""){
		$("#configFooter").removeClass("animated bounceInUp").addClass("animated bounceOutDown");
        setTimeout(function(){
            $("#configFooter").hide().removeClass("animated bounceOutDown");
        },3000);
	}else{
		$("#configFooter").removeClass("animated bounceOutDown").addClass("animated bounceInUp");
		$("#configFooter").show();
        setTimeout(function(){
            $("#configFooter").show().removeClass("animated bounceInUp");
        },3000);
	}
});*/
$(document).on('click', '#activeSelected', function() {
	var tp = $(this).attr("type");
	if(tp == "dev"){
		createDev = "";
	}else if(tp == "line"){
		clearCreateLineVar();
	}
	drawImage();
	$("#configContent"+pageCanvas).css({"cursor":"default"});
	globalFlag = false;
});

$(document).on('click', '.configCar', function() {
    $(".configCar").addClass('animated wobble');
    setTimeout(function(){
    	$(".configCar").removeClass('animated wobble');
    	$.mobile.changePage( $("#configEditorPage"), {
		  transition: "flow",
		  reverse: false,
		  changeHash: true
		});
    },1500);
});
$(document).on('click', '.configCar2', function() {
    $(".configCar2").addClass('animated wobble');
    setTimeout(function(){
    	$(".configCar2").removeClass('animated wobble');
    	$.mobile.changePage( $("#configEditorPage"), {
		  transition: "flow",
		  reverse: false,
		  changeHash: true
		});
    },1500);
});
$(document).on('click', '.adminCar', function() {
	$(".adminCar").addClass('animated wobble');
	setTimeout(function(){
		$(".adminCar").removeClass('animated wobble');
		$.mobile.changePage($('#adminDialog'),{
    		transition: "pop"
    	});
	},1500);
});
$(document).on('click', '.rmCar', function() {
	$(".rmCar").addClass('animated wobble');
	setTimeout(function(){
		$(".rmCar").removeClass('animated wobble');
		$.mobile.changePage($('#rmDialog'),{
    		transition: "pop"
    	});
	},1500);
});
$(document).on('click', '.pmCar', function() {
	$(".pmCar").addClass('animated wobble');
	setTimeout(function(){
		$(".pmCar").removeClass('animated wobble');
		$.mobile.changePage($('#pmDialog'),{
    		transition: "pop"
    	});
	},1500);
});
$(document).on('click', '.statCar', function() {
	$(".statCar").addClass('animated wobble');
	setTimeout(function(){
		$(".statCar").removeClass('animated wobble');
		$.mobile.changePage($('#statsDialog'),{
    		transition: "pop"
    	});
	},1500);
});
$(document).on('click', '#showGridline', function() {
	$("#showGridline").addClass('animated pulse');
	setTimeout(function(){
	showGrid();   	
	},1500);
});
$(document).on('click', '#editGridline', function() {
	$("#editGridline").addClass('animated pulse');
	setTimeout(function(){
		$.mobile.changePage($('#editGridPopup'),{
			changeHash: false,
    		transition: "pop"
		});
		
	},1500);
});
$(document).on('click', '#submitValue', function() {
		var val = ($("#gridValue").val());
        var val2 = parseInt(val);
        var a = checkNum(val2);

				
		if(a == true){
			return;
		}else if(a == false){
			globalGridSize = val2;
			console.log(globalGridSize);
			$("#editGridPopup").dialog('close');	
			clearGrid = true;
			setTimeout(function(){
					showGrid();
			},4000);
		}
								
});
$(document).on('keyup', '#gridValue', function() {
    if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
       this.value = this.value.replace(/[^0-9\.]/g, '');
    }
});


/*##########################################################################################################################*/
/*Sidebar bindings*/
$(document).on( "click", "#sideOpener", function( evt ) {
	$("#sidepanel").panel("open");
});
$(document).on( "swipeleft", "#sideOpener", function( evt ) {
    $("#sidepanel").panel("open");
});
$(document).on( "swiperight", "#sideOpener", function( evt ) {
    $("#sidepanel").panel("close");
});
$(document).on( "click", "#grid-button", function( evt ) {
	$("#barsPanel").popup( "open", { x: evt.pageX, y: evt.pageY},{ arrow: "t" } );
	evt.preventDefault();
});

$(document).on( "click", "#testToolIn", function( evt ) {	
	$( "#testToolMain" ).popup("close");
    $( "#deviceMain" ).popup("close");
    $( "#serverMain" ).popup( "close");
    $( "#connectivityMain" ).popup("close");
    $( "#interfaceMain" ).popup("close");
    $( "#testToolMain" ).popup( "open", { x: evt.pageX, y: 0, positionTo: "origin" });
	$("#testToolMain-screen").css({"z-index":"0"});
    evt.preventDefault();
});
$(document).on( "click", "#deviceIn", function( evt ) {
	$( "#testToolMain" ).popup("close");
    $( "#deviceMain" ).popup("close");
    $( "#serverMain" ).popup( "close");
    $( "#connectivityMain" ).popup("close");
    $( "#interfaceMain" ).popup("close");
    $( "#deviceMain" ).popup( "open", { x: evt.pageX, y: 0, positionTo: "origin" } );
	$("#deviceMain-screen").css({"z-index":"0"});
    evt.preventDefault();
});
$(document).on( "click", "#serverIn", function( evt ) {
	$( "#testToolMain" ).popup("close");
    $( "#deviceMain" ).popup("close");
    $( "#serverMain" ).popup( "close");
    $( "#connectivityMain" ).popup("close");
    $( "#interfaceMain" ).popup("close");
    $( "#serverMain" ).popup( "open", { x: evt.pageX, y: 0, positionTo: "origin" } );
    evt.preventDefault();
});
$(document).on( "click", "#connectivityIn", function( evt ) {
	$( "#testToolMain" ).popup("close");
    $( "#deviceMain" ).popup("close");
    $( "#serverMain" ).popup( "close");
    $( "#connectivityMain" ).popup("close");
    $( "#interfaceMain" ).popup("close");
    $( "#connectivityMain" ).popup( "open", { x: evt.pageX, y: 0, positionTo: "origin" } );
    evt.preventDefault();
});
$(document).on( "click", "#interfaceIn", function( evt ) {
	$( "#testToolMain" ).popup("close");
    $( "#deviceMain" ).popup("close");
    $( "#serverMain" ).popup( "close");
    $( "#connectivityMain" ).popup("close");
    $( "#interfaceMain" ).popup("close");
    $( "#interfaceMain" ).popup( "open", { x: evt.pageX, y: 0, positionTo: "origin" } );
    evt.preventDefault();
});

$(document).on('click', '.icon', function() {
	deviceSideBar(this);
});
$(document).on('click', '#deviceIco', function() {
	addHistory('Device');
	$("#deviceIco").addClass('animated pulse');
	setTimeout(function(){
		$("#deviceIco").removeClass('animated pulse');
		$("#gridPalette").hide();
		$("#devicePalette").show();
	},1500);		
});
$(document).on('click', '#deviceSubList', function() {
	loading("show");
	setTimeout(function(){
	    $.mobile.changePage($('#ConfigManagePop'),{
   		    transition: "pop"
        });
		globalSelectedDeviceList = [];
		globalManageDeviceShow ="deviceMenu";
		deviceListPopupTable('deviceMenu','local'); 
   	},1500);
});
$(document).on('taphold', '.manufacDevice', function(evt) {
	evt.preventDefault();
	deviceSideBar(this);
});
$(document).on('taphold', '.OSTypeDevice', function(evt) {
	evt.preventDefault();
	deviceSideBar(this);
});
$(document).on('taphold', '.prodFamilyDevice', function(evt) {
	evt.preventDefault();
	deviceSideBar(this);
});
$(document).on('taphold', '.modelDevice', function(evt) {
	evt.preventDefault();
    deviceSideBar(this);
});

$(document).on('click', '#testToolIco', function() {
	addHistory('Test Tool')
	$("#testToolIco").addClass('animated pulse');
	setTimeout(function(){
		$("#testToolIco").removeClass('animated pulse');
		$("#gridPalette").hide();
		$("#testToolPalette").show();
	},1500);		
});
$(document).on('click', '#testToolSubList', function(event) {
	loading("show");
	setTimeout(function(){
	    $.mobile.changePage($('#ConfigManageTestPop'),{
    	    transition: "pop"
        });
		TestToolListTable(); 
   	},1500);
});
$(document).on('taphold', '.manufacTT', function(evt) {
	evt.preventDefault();
    deviceSideBar(this);
});
$(document).on('taphold', '.prodFamilyTT', function(evt) {
	evt.preventDefault();
    deviceSideBar(this);
});
$(document).on('taphold', '.modelTT', function(evt) {
	evt.preventDefault();
    deviceSideBar(this);
});

$(document).on('click', '#serverIco', function() {
	 addHistory('Server');
	$("#serverIco").addClass('animated pulse');
	setTimeout(function(){
		$("#serverIco").removeClass('animated pulse');
		$("#gridPalette").hide();
		$("#serverPalette").show();
	},1500);		
});

$(document).on('click', '.connector', function() {
	connectivitySideBarScripts(this);
});

$(document).on('taphold', '.connectGeneric', function(evt) {
	evt.preventDefault();
    connectivitySideBarScripts(this);
});


$(document).on('click', '#connectIco', function() {
	if(globalInfoType == "JSON"){
    	var devices = getDevicesNodeJSON();
    }else{
    	var devices =devicesArr;
    }
    if(devices.length > 0){
		addHistory('Connectivity');
		$("#connectIco").addClass('animated pulse');
		setTimeout(function(){
			$("#connectIco").removeClass('animated pulse');
			$("#gridPalette").hide();
			$("#connectivityPalette").show();
		},1500);
	}
});
$(document).on('taphold', '#connectivitySubL1', function(evt) {
	evt.preventDefault();
	if(globalInfoType == "JSON"){
   		var devices = getDevicesNodeJSON();
    }else{
   		var devices =devicesArr;
    }
	if(devices.length > 1){
    	$(this).addClass('animated bounce');
        var id = $(this).attr("id");
        setTimeout(function(){
        	$("#"+id).removeClass('animated bounce');
       	},1500);
        globalFlag = true;
   	    lineType = $(this).attr('linktype');
    	ineName = $(this).attr('model');
        lineSpeed = $(this).attr('speed');
   }
});
$(document).on('taphold', '#connectivitySubL2', function(evt) {
	evt.preventDefault();
	if(globalInfoType == "JSON"){
    	var devices = getDevicesNodeJSON();
    }else{
        var devices =devicesArr;
    }
    if(devices.length > 1){
    	$(this).addClass('animated bounce');
        var id = $(this).attr("id");
        setTimeout(function(){
        	$("#"+id).removeClass('animated bounce');
        },1500);
        globalFlag = true;
        lineType = $(this).attr('linktype');
        lineName = $(this).attr('model');
        lineSpeed = $(this).attr('speed');
    }
});	
$(document).on('click', '#interfaceIco', function() {
	addHistory('Interface');
	$("#interfaceIco").addClass('animated pulse');
	setTimeout(function(){
		$("#interfaceIco").removeClass('animated pulse');
		$("#gridPalette").hide();	
		$("#interfacePalette").show();
	},1500);		
});
$(document).on('click', '#interfaceSubIPV4', function(){
	$(this).addClass('animated bounce');
	setTimeout(function(){
		$(this).removeClass('animated bounce');
	},1500);
	globalIPV4Flag = true;
});

$(document).on('click', '.bckPalette', function(){
	var thisId = $(this).attr("id");
	if(thisId == "testToolBck"){
		var tblId = "testToolPalette";
	}else if(thisId == "deviceBck"){
		var tblId = "devicePalette";
	}else if(thisId == "serverBck"){
		var tblId = "serverPalette";
	}else if(thisId == "interfaceBck"){
		var tblId = "interfacePalette";
	}else if(thisId == "connectivityBck"){
		var tblId = "connectivityPalette";
	}
	if(tblId){
		menuTbl(tblId);
	}
});
$(document).on('click', '#testTool-First',function(){
    menuTblFirst("testToolPalette","testTool-Back","testTool-First","testTool-Next","testTool-Last");
});
$(document).on('click', '#testTool-Last',function(){
    menuTblLast("testToolPalette","testTool-Back","testTool-First","testTool-Next","testTool-Last");
});
$(document).on('click', '#testTool-Back',function(){
	menuTbl("testToolPalette","testTool-Back","testTool-First","testTool-Next","testTool-Last");
});
$(document).on('click', '#testTool-Next',function(){
    menuTblNext("testToolPalette","testTool-Back","testTool-First","testTool-Next","testTool-Last");
});

$(document).on('click', '#device-First',function(){
    menuTblFirst("devicePalette","device-Back","device-First","device-Next","device-Last");
});
$(document).on('click', '#device-Last',function(){
    menuTblLast("devicePalette","device-Back","device-First","device-Next","device-Last");
});
$(document).on('click', '#device-Back',function(){
	menuTbl("devicePalette","device-Back","device-First","device-Next","device-Last");
});
$(document).on('click', '#device-Next',function(){
	menuTblNext("devicePalette","device-Back","device-First","device-Next","device-Last");
});

$(document).on('click', '#connectivity-First',function(){
    menuTblFirst("connectivityPalette","connectivity-Back","connectivity-First","connectivity-Next","connectivity-Last");
});
$(document).on('click', '#connectivity-Last',function(){
	menuTblLast("connectivityPalette","connectivity-Back","connectivity-First","connectivity-Next","connectivity-Last");
});
$(document).on('click', '#connectivity-Back',function(){
	menuTbl("connectivityPalette","connectivity-Back","connectivity-First","connectivity-Next","connectivity-Last");
});
$(document).on('click', '#connectivity-Next',function(){
    menuTblNext("connectivityPalette","connectivity-Back","connectivity-First","connectivity-Next","connectivity-Last");
});
$(document).on('click', '#connectivity-First',function(){
        addEvent2History("Click SideBar Connectivity"); //add event to history
        $('#connectivityPaletteSubTrMain').show();
        $('#connectivityPaletteSubTrL1L2').hide();
        $('#connectivityPaletteSubTrL1').hide();
        $('#connectivityPaletteSubTrL1Sub').hide();
        $('#connectivityPaletteSubTrL2').hide();
        $('#connectivityPaletteSubTrL2Sub').hide();
        $('#connectivity-Next').show();
        $('#connectivity-Last').show();
        $('#connectivity-Back').hide();
        $('#connectivity-First').hide();
    });
    $('#connectivity-Last').click(function(){
        menuTblLast("connectivityPalette");
        $('#connectivity-Next').hide();
        $('#connectivity-Last').hide();
        $('#connectivity-Back').show();
        $('#connectivity-First').show();

    });

$(document).on('click','.devicePaletteTr', function() {
	$("#deviceMain").find("img").show();
    $this = $(this).parent().parent();
	var nxt = $this.next();
	var levCur = $this.attr('level');
	if(nxt.html() != ""){
		specificChcker($this.next().attr('id'),this);
		$this.next().slideUp().show();
		var lev = $this.next().attr("level");
	}else{
		specificChcker($this.next().next().attr('id'),this);
		$this.next().next().slideUp().show();
		var lev = $this.next().next().attr("level");
	}
	function specificChcker(ths,ths2){
		if(levCur == "Device"){
			$("#"+ths+" > div").each(function(){
				var mn = $(this).find("img").attr("manufacturer");
				if(mn == $(ths2).attr('manufacturer')){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		}else if(levCur == "OS Type"){
			$("#"+ths+" > div").each(function(){
				var ostpe = $(this).find("img").attr("ostype");
        	    if(ostpe == $(ths2).attr('ostype')){
            	    $(this).show();
	            }else{
    	            $(this).hide();
        	    }	
			});
		}else if(levCur == "Product Family"){
			var prdfmCtr=0;
			$("#"+ths+" > div").each(function(){
	            var prdf = $(this).find("img").attr("productfamily");
        	    if(prdf == $(ths2).attr('productfamily')){
            	    $(this).show();
					prdfmCtr++;
	            }else{
    	            $(this).hide();
        	    }
			});
			if(prdfmCtr ==0){
				var thsss = $(ths).next().attr('id');
				levCur = "Model";
				specificChcker(thsss,ths2);
			}
        }else if(levCur == "Model"){	
			$("#"+ths+" > div").each(function(){
	            var mdl = $(this).find("img").attr("model");
        	    if(mdl == $(ths2).attr('model')){
            	    $(this).show();
	            }else{
    	            $(this).hide();
        	    }
			});
        }
	}
	$this.slideUp().hide();
	$("#devicePaletteTitle").html(lev);
});
$(document).on('click','.testToolPaletteTr', function() {
	$("#testToolMain").find("img").show();
    $this = $(this).parent().parent();
	var nxt = $this.next();
	var levCur = $this.attr('level');
	if(nxt.html() != ""){
		specificChcker($this.next().attr('id'),this);
		$this.next().slideUp().show();
		var lev = $this.next().attr("level");
	}else{
		specificChcker($this.next().next().attr('id'),this);
    	$this.next().next().slideUp().show();
		var lev = $this.next().next().attr("level");
	}
	function specificChcker(ths,ths2){
        if(levCur == "Device"){
            $("#"+ths+" > td").each(function(){
                var mn = $(this).find("img").attr("manufacturer");
                if(mn == $(ths2).attr('manufacturer')){
                    $(this).show()
                }else{
                    $(this).hide();
                }
            });
        }else if(levCur == "Product Family"){
            $("#"+ths+" > td").each(function(){
                var prdf = $(this).find("img").attr("productfamily");
                if(prdf == $(ths2).attr('productfamily')){
                    $(this).show()
                }else{
                    $(this).hide();
                }
            });
        }else if(levCur == "Model"){
            $("#"+ths+" > td").each(function(){
                var mdl = $(this).find("img").attr("model");
                if(mdl == $(ths2).attr('model')){
                    $(this).show()
                }else{
                    $(this).hide();
                }
            });
        }
    }
    $this.slideUp().hide();
	$("#TestToolPaletteTitle").html(lev);
});
$(document).on('click','.connPaletteTr', function() {
	var ltype = $(this).attr("linktype");
	if(ltype=="L1"){ var ltype2="L2"; }else{ var ltype2 ="L1";}
	$("#connectivityPaletteSubTr"+ltype).show();
	$("#connectivityPaletteSubTr"+ltype2).hide();
    $(this).parent().parent().hide();
});

$(document).on('click',".linkParent", function() {
	$(this).parent().parent().hide();
	var ltype = $(this).attr("linktype");
	if(ltype){
		connTbl();
	}
	function connTbl(){
		$("#connectivityPaletteSubTr"+ltype+"Sub > td").each(function(index) {
			var imgTd = $(this).find("img").attr("linktype");
			if(imgTd == ltype){
				$(this).parent().show();
				$(this).show();
			}else{				
				$(this).hide();
			}
		});
	}
});
$(document).on('click',"#connectivityAny", function() {
	$("#connectivityMain").find("img").show();
	$(this).parent().parent().hide();	
	if($.trim($("#connectivityPaletteSubTrL1L2").html()) != ""){
		$("#connectivityPaletteSubTrL1L2").show();
	}else{
		return;
	}
});


/*##########################################################################################################################*/


/*##########################################################################################################################*/
/* for CONFIG EDITOR: manage device (DONE BUTTON) */
$(document).on('click', "#dlistDone", function(){
	dragtoTrashDeviceOnly(glblDevMenImg,gblDevMenX,gblDevMenY,"true");
	setTimeout(function(){
		createQueryMapLink(globalSelectedDeviceList,globalDeviceListLoad);
   		$.mobile.changePage($('#configEditorPage'),{
   			transition: "pop"
   		});
		configEditorManageDevice = false // to stop objpath 
	},1500);
});
$(document).on('click', "#dlistApply", function(){
	dragtoTrashDeviceOnly(glblDevMenImg,gblDevMenX,gblDevMenY,"true");
	createQueryMapLink(globalSelectedDeviceList,globalDeviceListLoad);
	setTimeout(function(){
		deviceListPopupTable(globalDeviceListLoad,globalDevListTab);
		configEditorManageDevice = false; // to stop objpath 
	},1500);
});
$(document).on('click', '.devlistopt', function() {
	var type = $(this).parent().find('input').val();
	var inpt = $(this).parent().find('input').attr("id");
	var ctr =0;
	setTimeout(function(){
		if($("#"+inpt).is(":checked")){
			ctr++;
			if(type == "fullmesh"){
    			$("#hubspokedev").attr("checked",false).checkboxradio("refresh");
		    }else{
    			$("#fulmeshdev").attr("checked",false).checkboxradio("refresh");
		    }
		}
		if(ctr >0){
    	    $("#dlistApply").removeAttr("disabled");
	    }else{
    	    $("#dlistApply").attr("disabled","disabled");
	    }
	},100);
});

$(document).on('click', '#tabLocalDevice', function() {
	deviceListPopupTable(globalDeviceListLoad,'local');	
});
$(document).on('click', '#tabImportDevice', function() {
	deviceListPopupTable(globalDeviceListLoad,'import');	
});

$(document).on('click', "#dlistCancel", function(){
	$.mobile.changePage($('#configEditorPage'),{
    	transition: "pop"
    });
});
/*##########################################################################################################################*/
/*configEditorPage" action bindings*/
/*$( document ).on( "swipeup swipedown", "#header", function( e ) {
	if ( e.type === "swipeup" ) {
		$("#divMenuButton").removeClass("menuShow").addClass("menuHide");
	}else if(e.type === "swipedown"){
		$("#divMenuButton2").removeClass("menuShow2").addClass("menuHide2");
		$("#divMenuButton").removeClass("menuHide").addClass("menuShow");
	}
});
$( document ).on( "swipeup swipedown", "#divMenuButton", function( e ) {
    if ( e.type === "swipeup" ) {
        $("#divMenuButton").removeClass("menuShow").addClass("menuHide");
    }else if(e.type === "swipedown"){
        $("#divMenuButton2").removeClass("menuShow2").addClass("menuHide2");
        $("#divMenuButton").removeClass("menuHide").addClass("menuShow");
    }
});
*/
$( document ).on( "click", ".closeMap", function( event ) {
	var cls = $(this).parent().parent().parent().attr("class");
	if($("."+cls).attr("min") == "false"){
		$("."+cls).css({"bottom":"-120px"});
		$("."+cls).attr("min","true");
	}else{
		$("."+cls).css({"bottom":"9px"});
		$("."+cls).attr("min","false");
	}
});
$( document ).on( "click", "#menuOpener", function( event ) {
	var cls = $("#divMenuButton").attr("class");
	if(cls=="menuShow"){
		$("#divMenuButton").removeClass("menuShow").addClass("menuHide");
	}else{
		$("#divMenuButton2").removeClass("menuShow2").addClass("menuHide2");
		$("#divMenuButton").removeClass("menuHide").addClass("menuShow");
	}
});
$(document).on( "click", "#menuOpener2", function( event ) {
    var cls = $("#divMenuButton2").attr("class");
    if(cls=="menuShow2"){
        $("#divMenuButton2").removeClass("menuShow2").addClass("menuHide2");
    }else{
		$("#divMenuButton").removeClass("menuShow").addClass("menuHide");
        $("#divMenuButton2").removeClass("menuHide2").addClass("menuShow2");
    }
});
$( document ).on( "pageshow", "#configEditorPage", function( event ) {
	 setTimeout(function(){
        $("#cn-button").removeClass("ui-btn ui-shadow ui-corner-all");
    },350);
});
$( document ).on( "pagebeforeshow", "#configEditorPage", function( event ) {
     setTimeout(function(){
        $("#cn-button").removeClass("ui-btn ui-shadow ui-corner-all");
    },350);
});
$( document ).on( "click", ".kineticjs-content", function( event ) {
	$("#sideOpener").show();
    $( "#testToolMain" ).popup("close");
    $( "#deviceMain" ).popup("close");
    $( "#serverMain" ).popup( "close");
    $( "#connectivityMain" ).popup("close");
	$( "#interfaceMain" ).popup("close");
});
$( document ).on( "pageinit", "#configEditorPage", function( event ) {
	canvasEvent(0);
	$("#sidepanel" ).panel({
    	open: function( event, ui ) {
	        $("#sideOpener").hide();
    	},
	    close: function( event, ui ){
        	$("#sideOpener").show();
			$( "#testToolMain" ).popup("close");
			$( "#deviceMain" ).popup("close");
			$( "#serverMain" ).popup( "close");
			$( "#connectivityMain" ).popup("close");
			$( "#interfaceMain" ).popup("close");
	    }
	});
	setTimeout(function(){
        $("#cn-button").removeClass("ui-btn ui-shadow ui-corner-all");
    },350);

	initDialog();
	loadFilterDevices();
	$("#divMenuButton").show();
	$('#domainText').empty().append(window['variable' + dynamicDomain[pageCanvas] ]);
/*Grid  Menu icon action bindings*/
	$(document).on('click', '.imgReservation', function(){
		var id = $(this).attr('id');
		if(id == 'imgReservation'){
			$('#ulReserved').slideDown(500);	
			$('#ulScheduler').slideUp(500);
			$('#ulManage').slideUp(500);
		}else if(id == 'imgScheduler'){
			$('#ulReserved').slideUp(500);	
			$('#ulScheduler').slideDown(500);
			$('#ulManage').slideUp(500);
		}else if(id == 'imgManage'){
			$('#ulReserved').slideUp(500);	
			$('#ulScheduler').slideUp(500);
			$('#ulManage').slideDown(500);
		}
	});

	$(document).on('click', '#CancelRButton', function(){
		cancelReservation();
		resetCommitOptions();
	});
	$(document).on('click', '#RequestButton', function(){
		createQueryforResevartion();
		initDate();
	});
	$(document).on('change', '#FlashDurationSel', function(){
		durationOnChange($(this).val());
	});
	$(document).on('change', '.durationChange', function(){
		calculateEndDate();
	});

	$(document).on('change', '.picker', function(){
		outOfFocus();
	});
	


	$(document).on('click', '#resDomIco', function() {
		$("#resDomIco").addClass('animated pulse');
		setTimeout(function(){
			$("#resDomIco").removeClass('animated pulse');
			$.mobile.changePage($('#ResourcePop'),{
				changeHash : false,
	    		transition: "pop"
	    	});
		},1500);		
	});
	$(document).on('click', '#rmConnectivityLogs', function() {
		setTimeout(function(){
			$("#eventNewDevice").show();
		},1500);		
	});

	$(document).on('change','#resDomSelect', function() {
        window['variable' + dynamicDomain[pageCanvas] ] = $(this).val();
        loadGridMenuContent();
    });
    $(document).on('click', '#resDomChkbox', function() {
        if($(this).is(':checked') == true){
            $('#resDomSelect').selectmenu("enable");
			var domain = $("#resDomSelect").val();
            window['variable' + dynamicDomain[pageCanvas] ] = domain;
        }else{
            $('#resDomSelect').selectmenu("disable");
			var domain = $("#resDomSelect").val();
            window['variable' + dynamicDomain[pageCanvas] ] = domain;//"Auto";
        }
        loadGridMenuContent();
    });

	$(document).on('click', '.bckPaletteBars', function(){
		var tblId = $(this).parent().parent().parent().parent().attr("id");
		$("#"+tblId).hide();
		$("#barsPalette").show();
	});
	$(document).on('click', '.bck2ToolsMenu', function(){
		var tblId = $(this).parent().parent().parent().parent().attr("id");
		$("#"+tblId).hide();
		$("#viewTools").show();
	});
	$(document).on('click', '#topos', function(){
		$("#viewTools").hide();
		$("#diagramTools").show();
	});
	$(document).on('click', '#console', function(){
		$("#viewTools").hide();
		$("#diagramTools").show();
		openConsoleDevice();
	});
	$(document).on('click', '#SaveDiagram', function(){
	   	$.mobile.changePage("#SaveDiagramImg", {
			transition: "flow",
			reverse: false,
			changeHash: true
		});
		var stage = document.getElementById("canvasID0");
		stage.toDataURL("image/jpeg");
	});
	$(document).on('click', '#SaveDiagramOk', function(){
	});
	$(document).on('click', '#SaveDiagramCancel', function(){
	   	$.mobile.changePage("#configEditorPage", {
			transition: "flow",
			reverse: false,
			changeHash: true
		});
	});
	$(document).on('click', '#SaveInfoD', function(){
	});

    $(document).on('click', '#viewOptions', function() {
        $("#viewOptions").addClass('animated pulse');
        setTimeout(function(){
//            $("#viewOptions").removeClass('animated pulse');
            $("#barsPalette").hide();
            $("#viewOptionPalette").show();
        },1500);
    });
    $(document).on('click', '#enableDisableDebug', function() {
        $("#enableDisableDebug").addClass('animated pulse');
        setTimeout(function(){
            $("#viewOptions").removeClass('animated pulse');
			$("#debugheader").html("<center><h2>Debug</h2></center>");
			$.mobile.changePage( "#debugPopup", {
				transition: "pop",
	    		changeHash: false
    		});	
            $("#enableDisable").show();
        },1500);
	
    	$(document).on('click', '#okButton', function() {
			if ($("#radio-choice-1").is(':checked')){
				DebugMode=true;
			}else if ($("#radio-choice-2").is(':checked')){
				DebugMode=false;
			}
    	});
    });
/*---------kmmabignay::Tools::Configuration---------------------*/
	$(document).on('click', '#newpopupBasic', function() {
		var devArr = devicesArr;
		if(globalInfoType=="JSON"){devArr = getDevicesNodeJSON();}
		if(devArr && devArr==[] || devArr && devArr.length==0){
			$("#barsPanel").popup("close");
		 	setTimeout(function(){
				error("No device on canvas","Notification");
			},300);
			return;
		}
		newpopupBasicHandler(); 
	});
/*---------kmmabignay::Tools::Software---------------------*/
	$(document).on('click', '#toolsSoftwarePopup', function() {
		var devArr = devicesArr;
		if(globalInfoType=="JSON"){devArr = getDevicesNodeJSON();}
		if(devArr && devArr==[] || devArr && devArr.length==0){
			$("#barsPanel").popup("close");
		 	setTimeout(function(){
				error("No device on canvas","Notification");
			},300);
			return;
		}
		toolsSoftwarePopupHandler(); 
	});
/*---------kmmabignay::Tools::LinkSanity---------------------*/
	$(document).on('click', '#showlinksanity', function() {
		var devArr = devicesArr;
		if(globalInfoType=="JSON"){devArr = getDevicesNodeJSON();}
		if(devArr && devArr==[] || devArr && devArr.length==0){
			$("#barsPanel").popup("close");
		 	setTimeout(function(){
				error("No device on canvas","Notification");
			},300);
			return;
		}
		showlinksanityHandler(); 
	});
/*---------kmmabignay::Tools::LinkSanity---------------------*/
	$(document).on('click', '#toolsPowerPopup', function() {
		var devArr = devicesArr;
		$("#barsPanel").popup("close");
		if(globalInfoType=="JSON"){devArr = getDevicesNodeJSON();}
		if(devArr && devArr==[] || devArr && devArr.length==0){
		 	setTimeout(function(){
				error("No device on canvas","Notification");
			},300);
			return;
		}
        setTimeout(function(){
			toolsShowActPages("toolsPowerInfo");
		},350);
	});
/*--------------------------------------------------------------*/
    $(document).on('click', '#gridLines', function() {
        $("#gridLines").addClass('animated pulse');
        setTimeout(function(){
    //        $("#gridLines").removeClass('animated pulse');
            $("#viewOptionPalette").hide();
            $("#gridOptionsPalette").show();
        },1500);
    });
	$(document).on('click', '#barsConfig', function() {
        $("#barsConfig").addClass('animated pulse');
        setTimeout(function(){
  //          $("#barsConfig").removeClass('animated pulse');
            $("#barsPalette").hide();
            $("#configPalette").show();
        },1500);
    });
   $(document).on('click', '#deviceList', function() {
        $("#deviceList").addClass('animated pulse');
        setTimeout(function(){
//            $("#viewOptions").removeClass('animated pulse');
            $("#deviceMenu").hide();
            $("#deviceListSub").show();
        },1500);
    });
   $(document).on('click', '#deviceToolsList', function() {
        $("#deviceToolsList").addClass('animated pulse');
        setTimeout(function(){
//            $("#viewOptions").removeClass('animated pulse');
            $("#deviceMenu").hide();
            $("#deviceToolsListSub").show();
        },1500);
    });
   $(document).on('click', '#deviceLogsList', function() {
        $("#deviceLogsList").addClass('animated pulse');
        setTimeout(function(){
//            $("#viewOptions").removeClass('animated pulse');
            $("#deviceMenu").hide();
            $("#deviceLogsListSub").show();
        },1500);
    });
   $(document).on('click', '#deviceConsole', function() {
//        $("#deviceLogsList").addClass('animated pulse');
  //      setTimeout(function(){
//  //          $("#viewOptions").removeClass('animated pulse');
      //      $("#deviceMenu").hide();
        //    $("#deviceLogsListSub").show();
//        },1500);
		OpenPopUpDC();
    });
	$(document).on('click', '.bckDeviceMenu', function(){
		var tblId = $(this).parent().parent().parent().parent().attr("id");
		$("#"+tblId).hide();
		$("#deviceMenu").show();
	});
   $(document).on('click', '#linkList', function() {
        $("#linkList").addClass('animated pulse');
        setTimeout(function(){
//            $("#viewOptions").removeClass('animated pulse');
            $("#linkMenu").hide();
            $("#subLink").show();
        },1500);
    });
	$(document).on('click', '.bckLinkMenu', function(){
		var tblId = $(this).parent().parent().parent().parent().attr("id");
		$("#"+tblId).hide();
		$("#linkMenu").show();
	});
/*Load Config event bindings*/
	$(document).on('click', '#loadConfigImg', function() {
		globalInfoType = "JSON";
		$("#loadConfigImg").addClass('animated pulse');
        setTimeout(function(){
            $("#loadConfigImg").removeClass('animated pulse');
            $.mobile.changePage($('#loadConfig'),{
				changeHash : false,
                transition: "pop"
            });
		loadLoadConfig();
        },1500);
	});
	$(document).on('change', '#loadConfTypeSelect', function() {
//		$("#loadConfSelect").empty().append("<option style='display:block;'>Select Configuration</option>");
//		$("#loadConfSelect").trigger("create");
		var val = $('#loadConfTypeSelect > option:selected').html();
		if(val == "Static" || val == undefined){
			
			$("#loadConfSelect > option").each(function() {
				var type = $(this).attr("type");
				if(type == "stat"){
					$(this).css({"display":"block"});
				}else{
					$(this).css({"display":"none"});
				}
			});
			$('#fileDiv').hide();
//			loadLoadConfig();
		}else if(val == "Dynamic"){
			$("#loadConfSelect > option").each(function() {
				var type = $(this).attr("type");
                if(type == "dyn"){
                    $(this).css({"display":"block"});
                }else{
                    $(this).css({"display":"none"});
                }
            });
			$('#fileDiv').hide();
//			loadLoadConfig();
		}else if(val =="File"){			
			$('#fileDiv').show();
			showDirectory();
		}else{
/*			$("#loadConfSelect > option").each(function() {
				var type = $(this).attr("type");
            	$(this).css({"display":"none"});
            });*/
		}
	});
	$(document).on('click', '#okLoadConf', function() {
		var confName,mainid,fileType;
/*		$('#loadConfSelect > option:selected').each(function() {
			confName= $(this).html();
			mainid= $(this).attr("id");
			fileType = $(this).attr("filetype");
		});*/
		confName = $('#loadConfSelect > option:selected').html();
		mainid = $('#loadConfSelect > option:selected').attr("id");
		fileType = $('#loadConfSelect > option:selected').attr("filetype");
		if(confName == "" || confName == undefined && ($('#loadConfTypeSelect').val() != "file")){
			alert("Please select a configuration to load.");
			return;
		}else if($('#loadConfTypeSelect').val() == "file"){
			var cnfName = $("#loadConfSelect").val();
			showFile(cnfName);
		}else{
			loadLoadConfigOk(confName,mainid,fileType);
		}
	});
	$(document).on('click', '#cancelLoadConf', function() {
		$("#loadConfig").dialog("close");
	});
/*Delete Config event bindings*/
	$(document).on('click', '#deleteConfigImg', function() {
		loadDeleteConfig();
		$("#deleteConfigImg").addClass('animated pulse');
        setTimeout(function(){
            $("#deleteConfigImg").removeClass('animated pulse');
            $.mobile.changePage($('#deleteConfig'),{
				changeHash : false,
                transition: "pop"
            });
			$("#deleteConfTypeSelect").val("all").selectmenu("refresh");
        },1500);
	});
	$(document).on('change', '#deleteConfTypeSelect', function() {
		var val = $('#deleteConfTypeSelect').val();
		if(val =="static"){
			var stat=0;
			$("#deleteConfSelect > option").each(function() {
				var type = $(this).attr("type");
				if(type == "stat"){
					$(this).css({"display":"block"});
					stat++;
				}else{
					$(this).css({"display":"none"});					
				}
			});
			if(stat > 0){
				$("#deleteConfSelect").val("default").selectmenu("refresh");
			}
		}else if(val == "dynamic"){
			var dyn=0;
			$("#deleteConfSelect > option").each(function() {
				var type = $(this).attr("type");
                if(type == "dyn"){
                    $(this).css({"display":"block"});
					dyn++;
                }else{
                    $(this).css({"display":"none"});
                }
            });
			if(dyn > 0){
				$("#deleteConfSelect").val("default").selectmenu("refresh");
			}
		}else{
			$("#deleteConfSelect > option").each(function() {
				var type = $(this).attr("type");
            	$(this).css({"display":"block"});
            });
		}
	});
	$(document).on('click', '#okDeleteConf', function() {
		var confName,mainid,fileType;
		$('#deleteConfSelect > option:selected').each(function() {
			confName= $(this).attr("value");
			mainid= $(this).attr("id");
			fileType = $(this).attr("filetype");
		});
		if(confName == "" || confName == undefined){
			error("Please select a configuration to delete.","Notification");
			return;
		}else{
			var all = false;
			if($("#deleteConfSelect").val() == "all"){
				confName = globalConfgName;
				mainid = globalConfgId;
				all= true;
			}
			loadDeleteConfigOk(confName,mainid,fileType,all);
		}
	});
	$(document).on('click', '#cancelDeleteConf', function() {
        $("#deleteConfig").dialog("close");
    });
/*Save As Config event bindings*/
	$(document).on('click', '#saveAsConfigImg', function() {
		$('#saveConfFileName').attr('disabled',false);
		if(globalInfoType == "JSON"){
            var devices = getDevicesNodeJSON();
        }else{
            var devices =devicesArr;
        }
        if(devices ==[] || devices.length ==0){
            alert("No device/configuration to save, please create one first.");
            return;
        }else{
			loadSaveConfig('saveAs');
	        $("#saveAsConfigImg").addClass('animated pulse');
    	    setTimeout(function(){
        	    $("#saveAsConfigImg").removeClass('animated pulse');
 	            $.mobile.changePage($('#saveConfig'),{
					changeHash : false,
        	        transition: "pop"
            	});			
			},1500);
			var date = new Date();
		    var month = date.getMonth();
		    var day = date.getDay();
		    var year = date.getFullYear();
		    var hour = date.getHours();
		    var min = date.getMinutes();
		    var sec = date.getMilliseconds();
		    var file = "config_" + year + "-" + month + "-"+ day + "-" + hour + "-" + min + "-" + sec;
			if ($('#saveConfFileTypeDBType > option:selected').text() == 'Dynamic'){
				var type = '.dyn';
			}else if ($('#saveConfFileTypeDBType > option:selected').text() == 'Static'){
				var type = '.stat';
			}else if($('#saveConfFileTypeDBType > option:selected').text() == 'Testbed') {
				var type = '.tb';
			}else if($('#saveConfFileTypeDBType > option:selected').text() == 'Both') {
				var type = '';
			}
			$("#saveConfFileName").val(file+type);
		}
    });

/*Save Config event bindings*/
	$(document).on('click', '#saveConfigImg', function() {
		$('#saveConfFileName').attr('disabled',true);
		$('#saveConfFileName').val(loadConfigName);
		if(globalInfoType == "JSON"){
            var devices = getDevicesNodeJSON();
        }else{
            var devices =devicesArr;
        }
		if(devices ==[] || devices.length ==0){
    	    alert("No device/configuration to save, please create one first.");
        	return;
	    }
		loadSaveConfig('save');
		$("#saveConfigImg").addClass('animated pulse');
        setTimeout(function(){
            $("#saveConfigImg").removeClass('animated pulse');
            $.mobile.changePage($('#saveConfig'),{
				changeHash : false,
                transition: "pop"
            });			
			$("#submitSAveFile").hide();
			var file = window['variableConfigName'+pageCanvas] ;
			$("#saveConfFileName").val(file);
//			$("#saveConfFileTypeFileExt").hide();
//			$("#saveConfFileTypeFileType").hide();
        },1500);
	});
	$(document).on('change', "#saveConfFileTypeFileExt", function() {
		if($(this).val() == "topo"){
			createTopo();
		}else if($(this).val() == "titan"){
			createTitan();
		}
	});
	$(document).on('change', "#saveConfFileType", function() {
		createConfigName();
		if($(this).val() == "file"){
			$(".fileType").show();
			$(".dbType").hide();
			$("#submitSAveFile").show();
			$("#okSaveConf").hide();
			var nameVar = Name.split(".")[0];
	        Name = nameVar;
		}else{
			$("#okSaveConf").show();
			$(".fileType").hide();
            $(".dbType").show();
			$("#submitSAveFile").hide();
			var tp = $("#saveConfFileTypeDBType").val();
			if(tp == "static"){
         		var nameVar = Name.split(".")[0];
		        Name = Name = nameVar+".stat";
        	}else if(tp == "dynamic"){
            	var nameVar = Name.split(".")[0];
            	Name = Name = nameVar+".dyn";
	        }else if(tp == "testbed"){
            	var nameVar = Name.split(".")[0];
            	Name = Name = nameVar+".tb";
        	}
		}
		if (globalInfoType == "XML"){
			var xmlData = getXmlData();
		}else{
			var xmlData = getStringJSON(globalMAINCONFIG[pageCanvas]);
		}
		$("#saveConfFileName").val(Name);
		$("#saveConfFileTxtAreaXML").html(xmlData);
		$("#saveConfig").trigger("create");
	});
	$(document).on('change', "#saveConfFileTypeDBType", function() {
/*		if($(this).val() == "static"){
			var nameVar = Name.split(".")[0];
			Name = Name = nameVar+".stat";
		}else if($(this).val() == "dynamic"){
			var nameVar = Name.split(".")[0];
            Name = Name = nameVar+".dyn";
		}else if($(this).val() == "testbed"){
			var nameVar = Name.split(".")[0];
            Name = Name = nameVar+".tb";
		}else{
            var nameVar = Name.split(".")[0];
            Name = nameVar;
        }
       	$("#saveConfFileName").val(Name);*/
	var date = new Date();
    var month = date.getMonth();
    var day = date.getDay();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getMilliseconds();
    var file = "config_" + year + "-" + month + "-"+ day + "-" + hour + "-" + min + "-" + sec;
	if ($('#saveConfFileTypeDBType > option:selected').text() == 'Dynamic'){
		var type = '.dyn';
	}else if ($('#saveConfFileTypeDBType > option:selected').text() == 'Static'){
		var type = '.stat';
	}else if($('#saveConfFileTypeDBType > option:selected').text() == 'Testbed') {
		var type = '.tb';
	}else if($('#saveConfFileTypeDBType > option:selected').text() == 'Both') {
		var type = '';
	}
		$("#saveConfFileName").val(file+type);

	});
	$(document).on('click', '#okSaveConf', function() {
		var confName = $("#saveConfFileName").val();
		var FType = $("#saveConfFileType").val();
		var FTypeDB = $("#saveConfFileTypeDBType").val();
		if(FType =="database" && (FTypeDB == "dynamic" || FTypeDB == "static")){
			saveConfigtoDB(confName,FTypeDB);
		}else if(FType =="database" && FTypeDB == "testbed"){
			Name = Name+".dyn";
			saveConfigtoDBTestbed(confName);
		}
	});
	$(document).on('click', "#submitSAveFile", function() {
        var confName = $("#saveConfFileName").val();
		var ext = $("#saveConfFileTypeFileExt").val();
		var cont = $("#saveConfFileTxtAreaXML").html();
		downloadFile(confName,cont,ext);
    });
	$(document).on('click', '#cancelSaveConf', function() {
        $("#saveConfig").dialog("close");
    });


/*changing of image src of action buttons*/
	$(document).on('click', '#applyall', function() {
		addHistory('Apply All');
		if(globalApplyAll == "deactive"){
			globalApplyAll = "active";
		}else{
			globalApplyAll = "deactive";
		}
	});
	$(document).on('click', '#loadactive', function() {
		if(globalInfoType == "JSON"){
  	      var devices = getDevicesNodeJSON();
    	}else{
        	 var devices =devicesArr;
	    }
    	if(devices.length >0){
        	confirmation("Devices on the canvas will be cleared for this action.<br/> Do you want to continue?","Warning","clearCanvas();loadActiveTableQuery();addHistory('Load Active');");
	        return;
    	}else{
			loadActiveTableQuery();
		}
    });
	$(document).on('click', '#clearcanvas', function() {
		var header = "Clear Canvas";
		var msg = "Are you sure you want to clear the canvas?";
		confirmation(msg,header,"clearCanvas();addHistory('Clear Canvas');");
    });
    $(document).on('click', '#committopology', function() {
		$("#committopology").addClass('animated pulse');
		addHistory('Commit');
		if(globalInfoType == "JSON"){
            var devices = getDevicesNodeJSON();
        }else{
            var devices =devicesArr;
        }
		if(devices.length > 0){
/*	        $(this).attr("src","img/action_buttons/commitActive.png");
    	    $("#applyall").attr("src","img/action_buttons/applyall.png");
        	$("#clearcanvas").attr("src","img/action_buttons/clear.png");
	        $("#cancelreservation").attr("src","img/action_buttons/cancel.png");
			$("#loadactive").attr("src","img/action_buttons/loadactive.png");*/

			$(document).on('pagebeforeshow', '#commitOptions', function (e, ui) {				
				resetCommitOptions();
				setTimeout(function(){
					checkCommitOptions();
				},100);
			});
			setTimeout(function(){
        	    $("#committopology").removeClass('animated pulse');
            	$.mobile.changePage('#commitOptions',{
                	transition: "pop"
	            });
    	        populateCombo();
        	},1500);
		}else{
			error("No device/s to commit, please create one first.","Alert!");
		}
    });
	$(document).on('click', '#cancelreservation', function() {
/*        $(this).attr("src","img/action_buttons/cancelActive.png");
		$("#loadactive").attr("src","img/action_buttons/loadactive.png");
        $("#applyall").attr("src","img/action_buttons/applyall.png");
        $("#clearcanvas").attr("src","img/action_buttons/clear.png");
        $("#committopology").attr("src","img/action_buttons/commit.png");*/
		if(window['variable' + dynamicResourceId[pageCanvas] ] != "" && window['variable' + dynamicResourceId[pageCanvas] ] != undefined && window['variable' + dynamicResourceId[pageCanvas] ] != null){
			var todo = "addHistory('Cancel Reservation');cancelReservation();";
			confirmation("Are you sure you want to cancel<br/>the topology on the canvas?","Notification",todo,"",true);
		}else{
            error("Please load an active reservation to cancel.","Notification");
        }
    });
	$(document).on('click', '#mapBtn', function() {
		autoResizeCanvas();		
		$("#historyContainer").hide();
		$("#configNameContainer").hide();
		flagMiniMap=false;
		$('#pinMiniMap').attr('src','images/unpin.png');
		if($("#mappingCanvasContainer").is(":visible")){
			$("#mappingCanvasContainer").hide();
		}else{
			$("#mappingCanvasContainer").show();
		}
		if(window['globalNavigator'+ pageCanvas]['fromNavigator'] == ""){
			duplicateOnMinimap();
			duplicateOnMinimap();
		}
	});
	$(document).on('click', '#pinMiniMap', function() {
		if (flagMiniMap == false) {
            flagMiniMap=true;
            $('#pinMiniMap').attr('src','images/pin.png');
        }else {
            flagMiniMap=false;
            $('#pinMiniMap').attr('src','images/unpin.png');
        }
	});
	$(document).on('click', '#configNameBtn', function() {
		$("#mappingCanvasContainer").hide();
		$("#historyContainer").hide();
        if($("#configNameContainer").is(":visible")){
            $("#configNameContainer").hide();
        }else{
            $("#configNameContainer").show();
        }
    });
	$(document).on('click', '#historyBtn', function() {
		addHistory();
		$("#configNameContainer").hide();
		$("#mappingCanvasContainer").hide();
        if($("#historyContainer").is(":visible")){
            $("#historyContainer").hide();
        }else{
            $("#historyContainer").show();
        }
    });
	$(document).on('click', '#clearHistory', function() {
		clearCanvasHistory();
	});
    $(document).on('click', '#Magnify', function() {
    });
	$(document).on('click', '.kineticjs-content', function() {
		$("#configNameContainer").hide();
        $("#mappingCanvasContainer").hide();
		$("#historyContainer").hide();
    });
});
$(document).on('click', '#okCommitOptions', function() {
	initDate();
	commitTopology();
});
$(document).on('click', '#cancelCommitOptions', function() {
	toConfig();
	$("#commitOptions").dialog("close");
	resetCommitOptions();
});
$(document).on('click', '#saveConfname', function() {
	window['variableConfigName'+pageCanvas] = $("#configText").val();
	globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Name = window['variableConfigName'+pageCanvas];
	addEvent2History("Edited Configuration Name");
	//addHistory("Edited Configuration Name");
	error("Configuration Name saved.","Notification");
});

$(document).on('click', '#comOpStartRes', function() {
	if(!$("#comOpStartRes").is(":checked")){return;}
	toolsConfPages("toolsStartRes");
	$("#customPage").on("pageshow",function(){
		$("#startReservationOk").attr("onclick","saveReservation();");
		$("#startReservationCancel").attr("onclick","cancelstartEndReserve('end');");
	});
});

$(document).on('click', '#comOpEndRes', function() {
	if(!$("#comOpEndRes").is(":checked")){return;}
	toolsConfPages("toolsEndRes");
	$("#customPage").on("pageshow",function(){
		$("#endReservationOk").attr("onclick","saveEndReservation();");
		$("#endReservationCancel").attr("onclick","cancelstartEndReserve('end');");
	});
});

$( document ).on( "pageinit", "#commitPop", function( event ) {
	durationOnChange('Duration');	
	initDate();
	outOfFocus();
});
$( document ).on( "pageinit", "#ConfigManageTestPop", function( event ) {
	$(document).on('click', '#testlistDone', function() {
		validationTTList();
    });

});

$( document ).on( "pageinit", "#ConfigManagePop", function( event ) {
	$(document).on("change","#graphical", function(){
         globalDevListType = "graphical";
         deviceListPopupTable(globalDeviceListLoad,globalDevListTab);
    });
    $(document).on("change","#table-view", function(){
        globalDevListType = "tableview";
        deviceListPopupTable(globalDeviceListLoad,globalDevListTab);
    });

/*	$(document).on("click","#DevlistGraphical", function(){
	     globalDevListType = "graphical";
         deviceListPopupTable(globalDeviceListLoad,globalDevListTab);
    });
    $(document).on("click","#DevlistTableView", function(){
    	globalDevListType = "tableview";
        deviceListPopupTable(globalDeviceListLoad,globalDevListTab);
	});*/
});

$( document ).on( "pageinit", "#warning", function( event ) {
	$(document).on('click', '#NoAlertButton', function( event) {
		testToolObj = [];
		checkDevNameTT = [];
		checkPortsTTList = [];
		$("#testToolPaletteSubTrList").hide();
	});

	$(document).on('click', '#YesAlertButton', function( event) {
		$('.trManageTestTool').each(function(){
			$(this).removeClass('highlight');
			testToolObj = [];
			checkDevNameTT = [];
			checkPortsTTList = [];
		});

	});
});
$( document ).on( "pageinit", "#PortTestTool", function( event ) {
	loading('hide');
	$('#PortTitle').text(HostName);	
	PortTestToolTable();
	$(document).on('change', '#portTypeTT', function() {
		connTypeFilter();
    });
	$(document).on('click', '#cport', function() {
		if($(this).is(':checked')){
			for(var i = 0; i < testToolObj.length; i++){
				if(HostName == testToolObj[i].DeviceName){
					testToolObj[i].Flag = 1;
				}
			}
		}else{
			for(var i = 0; i < testToolObj.length; i++){
				if(HostName == testToolObj[i].DeviceName){
					testToolObj[i].Flag = 0;
				}
			}


		}
    });
});
$( document ).on( "pageinit", "#loadActivePop", function( event ) {
	$('#divloadActiveTable').load('pages/ConfigEditor/LoadActiveTable.html',function(){
		loadActiveTableQuery();
	});
	$(document).on('click', '#LoadActiveButton', function() {
	   	$.mobile.changePage("#configEditorPage", {
			transition: "flow",
			reverse: false,
			changeHash: true
		});
		showActiveTopology();
    });
	$(document).on('click', '#CloseALButton', function() {
   	   	$.mobile.changePage("#configEditorPage", {
			transition: "flow",
			reverse: false,
			changeHash: true
		});
    });
	$(document).on('click', '#cbShowAllLabel', function() {
		setTimeout(function(){
			if($('#cbShowAll').is(':checked') == true){
				globalLAFlag = true;
				loadActiveTableQuery();
			}else{
				globalLAFlag = false;
				loadActiveTableQuery();
			}
		},100);
    });
});

$( document ).on( "pageinit", "#FilterMenuPop", function( event ) {
	disabledFilter();
	initDynamicFilterValue();
	$(document).on('click', '#CloseFButton', function() {
		$.mobile.changePage( "#configEditorPage", {
			transition: "flow",
			reverse: false,
		  	changeHash: true
		});

	});
	$(document).on('click', '#DoneFButton', function() {
		$.mobile.changePage( "#configEditorPage", {
			transition: "flow",
			reverse: false,
		  	changeHash: true
		});

	});
	$(document).on('change', '.changeSelected', function(){
		if($(this).attr('id') == 'sysNameselF'){
			systemsname2 = $(this).val();			
		}
		if($(this).attr('id') == 'ProductselF'){
			productId2 = $(this).val();
		}
		if($(this).attr('id') == 'VersionselF'){
			vId2 =  $(this).val();
		}
		if($(this).attr('id') == 'OSselF'){
			ostype2 =  $(this).val();

		}
		if($(this).attr('id') == 'OSVersionselF'){
			osversion2 =  $(this).val();			
		}
		if($(this).attr('id') == 'SWselF'){
			swpackage2 =  $(this).val();
		}
//		setTimeout(function(){
			onChangeDropDownList($(this).val(), $(this).attr('did'));
//		},500);
	});


});
$( document ).on( "pageinit", "#administrationPage", function( event ) {
	initDialog();
});
$( document ).on( "pageinit", "#powerManagementPage", function( event ) {
	initDialog();
});

$( document ).on( "pageinit", "#ClearAllPopup", function( event ) {
	initDialog();
	if(globalPageRM == "ReservationHistory"){
		$('#divclearAllResHist').show();
		$('#divclearAllSchedHist').hide();
		$('#divreleaseAllDevice').hide();
	}else if(globalPageRM == "SchedulerHistory"){
		$('#divclearAllResHist').hide();
		$('#divclearAllSchedHist').show();
		$('#divreleaseAllDevice').hide();
	}else if(globalPageRM == "ResevationReserve"){
		$('#divclearAllResHist').hide();
		$('#divclearAllSchedHist').hide();
		$('#divreleaseAllDevice').show();
	}	
	$(document).on('click', '#ClearAllRHistory', function() {
		clearAllHistory();	
	});
	$(document).on('click', '#ClearAllSHistory', function() {
		clearAllSchedHistory();
	});
});
$( document ).on( "pageinit", "#ClearPopup", function( event ) {
	initDialog();
	if(globalPageRM == "ReservationHistory"){
		$('#divclearResHist').show();
		$('#divclearSchedHist').hide();
		$('#divdeleteDevice').hide();
	}else if(globalPageRM == "SchedulerHistory"){
		$('#divclearResHist').hide();
		$('#divclearSchedHist').show();
		$('#divdeleteDevice').hide();
	}else if(globalPageRM == "ManageDevice"){
		$('#divclearResHist').hide();
		$('#divclearSchedHist').hide();
		$('#divdeleteDevice').show();			
	}else if(globalPageRM == "ReservationReserve"){
		$('#divclearResHist').hide();
		$('#divclearSchedHist').hide();
		$('#divdeleteDevice').hide();		
		$('#divreleaseSpecificDevice').show();			
	}else if(globalPageRM == "SchedulerEvent"){
		$('#divcancelEvent').show();
		$('#divclearResHist').hide();
		$('#divclearSchedHist').hide();
		$('#divdeleteDevice').hide();		
	}
});
$(document).on("pageinit", "#RMLoadImage", function(event){
$(document).on('click', '#rmLoadImageSelectAll', function() {
		selectedAllRow();
	});
$(document).on('click', '#rmLoadConfigSelectAll', function() {
		selectedAllRow();
	});
	setTimeout(function(){
		loadImage();
		loadConfig();
		loadImageDetail();
		loadConfigDetail();
	},1000);
});
$(document).on("pageinit", "#RMSaveImage", function(event){
$(document).on('click', '#rmSaveImageSelectAll', function() {
		selectedAllRow();
	});
$(document).on('click', '#rmSaveConfigSelectAll', function() {
		selectedAllRow();
	});
	setTimeout(function(){
		saveImage();
		saveConfig();
		saveImageDetail();
		saveConfigDetail();
	},1000);
});
$( document ).on( "pageinit", "#RMNewRes", function( event ) {
		$(document).on("click","#OkButton", function(){
			setTimeout(function(){
				getServerTime();
				getdevicetype();
				queryCreateXMLData();
		//		createXMLData();
			},1000);
});
		$( document ).on( "click", "#startRes", function() {
		$.mobile.changePage("../RM/RMLoadImageTable.html",{
			transition: "flow",
			reverse: false,
			changeHash:true
	});

});
	$( document ).on( "click", "#endRes", function() {
		$.mobile.changePage("../RM/RMSaveImageTable.html",{
			transition: "flow",
			reverse: false,
			changeHash:true
		});
	});
});
$(document).on('pageinit', '#editDeviceTable', function(event){
	clearInterval(autoRefresh);
	$(document).on('change' ,'#endTime', function(){
			getResLimit();
			getServerTime();	
	});
	$(document).on('change' ,'#endDate', function(){
		setTimeout(function(){
			validateUpdatedDate();
		},1000);
	});

	$(document).on('click','#rmApplyExtend', function(){
		reserveExtendApply();
	});
});
$(document).on("pageinit", "#RMCalendar", function(event){
	$('#tabsCalendar').tabs();	
});

$( document ).on( "pageinit", "#RMReservation", function( event ) {
	$(document).on('click', '#rmBackBtn', function(){
		$.mobile.changePage('index.html',{
			transition: "flow",
			reverse :false,
			changeHash: true
		});
	});
/*----------Reservation Reserved Tab-------------*/
	
	setTimeout(function(){
		loadReserve();
		$('#tabsReservation').tabs();
		$('#RMReservation').trigger('create');
	},5000);
	initDialog();	
	$("#configFooter").hide();
	$(document).on('click','#liReserved', function(){
		loadReserve();
	});
	$(document).on('click','#okEditDevice', function(){
		loadReserveEdit();
			$.mobile.changePage('../RM/RMEditDeviceTable.html',{
				transition: "flow",
				reverse: false,
				changeHash: true
			});

	});
	$(document).on('change', '#tableCalendarView', function(){
		$.mobile.changePage('../RM/RMCalendarView.html',{
			transition: "flow",
			reverse:false,
			changeHash: true
		});
		changeReservationView();
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});
	$(document).on('click', '#rmReserveSelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '#ReserveRelease', function() {
		loadReserveRelease();
	});

	$(document).on('click', '#ReserveEdit', function() {
	//	loadReserveRelease();
		setTimeout(function(){
			var exceedReservation = checkExtensionLimit();
			var unprovStatus = checkUnprovisioningStatus();
			if(exceedReservation == 0){
					$.mobile.changePage( "../RM/RMEditDevice.html", {
					  transition: "flow",
					  reverse: false,
					  changeHash: true
					});
			}
		},1000);
		
	});

	$(document).on('click', '#ReserveGenerateReport', function() {
		RMGenerateReport();		
	});
	$(document).on('click', '#releaseSpecificDevice', function() {
		ReleaseSpecific();		
	});

	$(document).on('click', '#ReleaseAllDevice', function() {
		releaseAllDevices();
	});
	$(document).on('click', '#ReleaseOtherUsersDevice', function() {
		releaseAllDevices();		
	});
	$(document).on('click', '#ReserveReleaseAll', function() {
		checkIfTheresAnotherUser();
	});

/*----------Reservation Connectivity Tab-------------*/
	$(document).on('click', '#liConnectivity', function() {
		setTimeout(function(){
			loadConnectivity();
			$('#tabsReservation').tabs();
			$('#RMReservation').trigger('create');
		},5000);	
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});
	$(document).on('click', '#rmConnectivitySelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '#ConnectivityGenerateReport', function() {
		RMGenerateReport();	
	});	
/*----------Reservation Port Tab-------------*/
	$(document).on('click', '#liPort', function() {
		setTimeout(function(){
			loadPort();
			$('#tabsReservation').tabs();
			$('#RMReservation').trigger('create');
		},5000);	
	});
	$(document).on('click', '#rmPortSelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '#PortGenerateReport', function() {
			RMGenerateReport();		
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});

/*----------Reservation History Tab-------------*/
	$(document).on('click', '#liHistory', function() {
		setTimeout(function(){
			loadHistory();
			$('#tabsReservation').tabs();
			$('#RMReservation').trigger('create');
		},5000);	
	});
	$(document).on('click', '#rmHistorySelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '#ClearRHistory', function() {
		clearRHistory();	
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});
/*----------Reservation Devices Tab-------------*/
	getDomainsForResDev();
	setTimeout(function(){
		$('#tabsReservation').tabs();
		$('#RMReservation').trigger('create');
	},1000);
	$(document).on('click', '#liDevices', function(){
		loadDevices();
	});
	$('#ulDevices').tabs();
	$(document).on('click', '#liImported', function() {
		loadImportedDevices();
		$('#liFTab2').show();
		$('#liFTab2').removeAttr('style');
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});
	$(document).on('click', '#rmDevicesSelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '#rmImportedDevicesSelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '#DevicesReserve', function() {
		checkIfDutExists();
		InvalidIteration();	
	});
	$(document).on('click', '#devAdvanced', function() {
		$.mobile.changepage("../rm/rmadvancedfilter.html", {
			transition: "flow",
			reverse: false,
			changehash: true
		});
	});
});
$(document).on('pageinit', "#advancedFilter", function(event){
	setTimeout(function(){
		getSystemInfo();
		getRouteInfo();
		getEmbedInfo();
		getLineCardInfo();
		getModuleInfo();
		getPortInfo();
		//disableColumn();
		//loadDevices();
	//	loadImportedDevices();
	},2000);
	$('#advancedFilter').trigger('create');
	})
/*----------Scheduler History Tab-------------*/
$(document).on("pageinit", "#RMScheduler", function(event){
	setTimeout(function(){
		loadEventSched();
		$('#tabsScheduler').tabs();
		$('#RMScheduler').trigger('create');
	},5000);
	initDialog();
	$("#configFooter").hide();
	$(document).on('click', '#liEvent', function(){
		setTimeout(function(){
			loadEventSched();
			$('#tabsScheduler').tabs();
			$('#RMScheduler').trigger('create');
	},5000);
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});
	$(document).on('click', '#rmEventSchedulerSelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '.sched', function() {
		eventid1 = $(this).attr('eId');
		devdev1 = $(this).attr('mId');	
		statsstats = $(this).attr('sId');
		configname = $(this).attr('configname');
	});
	$(document).on('click', '#continueCancel', function() {
		SchedCancel();	
	});
/*----------Scheduler Event Tab-------------*/
$(document).on('click', '#liSHistory', function() {
		setTimeout(function(){
			loadHistorySched();
			$('#tabsScheduler').tabs();
			$('#RMScheduler').trigger('create');
		},5000);	
	});
	$(document).on('click', '#rmHistorySchedulerSelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '.sched', function() {
		eventid1 = $(this).attr('eId');
		devdev1 = $(this).attr('mId');	
		statsstats = $(this).attr('sId');
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});
	$(document).on('click', '#ClearSHistory', function() {
		clearSHistory();	
	});
});
	
/*----------Manage Devices Tab-------------*/

$( document ).on( "pageinit", "#RMManageDevice", function( event ) {
	$("#configFooter").hide();
	initDialog();
	loadManageDevice();
	$(document).on('click', '#ManageAdd', function() {
		setTimeout(function(){
		var addDevice = addManageDevice();
			if(addDevice == 0){
				$.mobile.changePage( "../RM/RMAddDevice.html", {
					  transition: "flow",
					  reverse: false,
					  changeHash: true
					});
			}
		},1000);
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});

	$(document).on('click', '#rmManageSelectAll', function() {
		selectedAllRow();
	});
	$(document).on('click', '#ManageGenerateReport', function() {
			RMGenerateReport();		
	});	
	$(document).on('click', '#deleteDeviceManage', function() {
			deleteManageDevice();	
	});
	$(document).on('click', '#devAdvanced', function() {
		$.mobile.changePage("../RM/RMAdvancedFilter.html", {
			transition: "flow",
			reverse: false,
			changeHash: true
		});
	});
	$(document).on('click', '#showMore', function(){
		showMore();
	});

});
$(document).on("pageinit","#DeviceInformation",function(event){
	$(document).on('click', '#liManual', function() {
		$('#rmtabs-2').show();
		$('#rmtabs-2').removeAttr('style');
	});
	$(document).on('change', '#devicetype2', function() {
			setManufacturer($(this).val());	
	});
	setTimeout(function(){
		$( "#tabsDevInfo" ).tabs();
		$('#DeviceInformation').trigger('create');
	},3000);
	$(document).on('change', '#chassisip', function() {
			changeButton();	
	});
	$(document).on("click", "#DevPort", function(){
		changeStructure = 1;
	});
	$(document).on("click", "#DevSlotPort", function(){
		changeStructure = 2;
	});
	$(document).on("click", "#DevSlotModPort", function(){
		changeStructure = 3;
	});
	$(document).on("click", "#DevSlotPicPort", function(){
		changeStructure = 4;
	});
});
$(document).on("pageinit", "#DevStructurePopup", function(event){
	if(changeStructure == 1){
		$('#divDevice').show();
		$('#divPort').show();
		$('#divSlot').hide();
		$('#divPic').hide();
		$('#divModule').hide();
		disableColumn();
	}else if(changeStructure == 2){
		$('#divDevice').show();
		$('#divPort').show();
		$('#divSlot').show();
		$('#divPic').hide();
		$('#divModule').hide();
		disableColumn();
	}else if(changeStructure == 3){
		$('#divDevice').show();
		$('#divPort').show();
		$('#divSlot').show();
		$('#divPic').hide();
		$('#divModule').show();
		disableColumn();
	}else if(changeStructure == 4){
		$('#divDevice').show();
		$('#divPort').show();
		$('#divSlot').show();
		$('#divPic').show();
		$('#divModule').hide();
		disableColumn();
	}
	$(document).on('change', '#Devicehostname', function(){
		getHostValid();	
	});	
	$('#divDevice').tabs();
	$('#divPort').tabs();
	$('#divSlot').tabs();
	$('#divModule').tabs();
	$('#divPic').tabs();
});
$(document).on("pageinit", "#EditDevice", function(event){
		setTimeout(function(){
			getActiveReservationIteration();
			getDevicesFromSelectedReservation();
		}, 5000);
	$(document).on('click','#okEditDevice', function(event){
		loadReserveEdit();
	});
	$(document).on('change','#toAppExt', function(){
		toggleDevicesOptions();
	});
	$(document).on('change','#iterxt', function(){
		toggleIterationOptions();
	});
});
$( document ).on( "pageinit", "#RMHistorySched2", function( event ) {
	initDialog();
	loadHistoryScheduler2();
	$(document).on('click', '#rmConnectivityLogs', function() {
		showAllConnections();
	});
	$(document).on('click', '.SanityLogs', function() {
		showDeviceConnections();	
	});

	$(document).on('click', '.showLogs', function() {
		globalHostName = $(this).attr('hostname');
		globalDeviceId = $(this).attr('deviceId');
	});
});
$(document).on("pageinit", "#RMDeviceLogs", function(event){
	$(document).on('click', '.LinkLogs', function(){
		showLinkSanityLogs();	

	});
});
$(document).on("pageinit","#Testtool", function(event){
	initDialog();
	loadTesttoolTable();

	$(document).on("click","#OkButtonTesttool", function(){
		setTimeout(function(){
				getServerTime();
				getdevicetype();
				queryCreateXMLData();
		//		createXMLData();
		},1000);
	});
	$(document).on("click", "#rmTesttoolSelectAll", function(){
		selectedAllRow();
	});
});
$(document).on("pageinit", "#advancedFilter", function(event){
		
});
$( document ).on( "pageinit", "#statisticsPage", function( event ) {
	initDialog();
	getUlDomains();
});

$( document ).on( "pageinit", "#statisticsdomainpage", function( event ) {
	initdialog();
	initstatcomponent();
});





//------------------Statistics Domain---------------------------------------------------------

/*$( document ).on( "click", "#imgStatUser", function() {
	setTimeout(function(){
		StatSelectTable();
		getUlDomains();
		changeComponentsUser();
//		DeviceDetailedTableTable();
	},500);
});
$( document ).on( "change", "#ulDomain", function() {
	globalDomainContent = $(this).val();
	console.log(dom+"===================================");
	getUlDomains();
	var domid = $("#ulDomain").val();
    console.log(domid+"domsssssssssssssqqqq");
	changeComponents();
});
*/
//=============domain=======
$( document ).on( "pageinit", "#statsDialog", function( event ) {
//	datePickerStat();

//$( document ).on( "change", "#statSelect", function() {
//	console.log("qwer");
//	StatSelectTable();
//o);
//"imgStatDomain"
			//=========== inicialized global value
	$( document ).on( "click", "#imgStatDomain", function() {
		setTimeout(function(){
			hideMainTable();
			StatSelectTable();
			getUlDomains();
			statsViewDate();
			DeviceDetailedTable2();
//			$(".ShowGraph").hide();
//			console.log('hide');
			//statsViewDate();
		},500);
	});
	$( document ).on( "click", "#imgStatUser", function() {
		setTimeout(function(){
			StatSelectTable();
			getUlDomains();
			statsViewDate();
			UserDeatiledTable();
		//statsViewDate();
		},500);
	});

		
	$( document ).on( "change", "#ulDomain", function() {
		globalDomainContent = $(this).val();
		getUlDomains();
		var domid = $("#ulDomain").val();
		changeComponents();
		changeComponentsUser();
	});

			//========== Dropdown domain List
	$( document ).on( "click", "#ulDomain", function() {
		console.log("qwer");
		getUlDomains();
		changeComponents();
	});

			//====Statistics View (day, week, month, quarter, anual, custom )
	$( document ).on( "change", "#statsView", function() {
		globalStatsView = $(this).val();
		statsViewDate(globalStatsView);
//		$("#statsView2").listview("refresh");
		changeComponents(globalStatsView);
	});

			//====datePickerStat daily
	$( document ).on( "click", "#datePickerStat", function() {
		console.log("qwer");
		datePickerStat();
		changeComponents();
	});
			//====Statistics View (Utilization Reservation )
	$( document ).on( "change", "#statsViewNew", function() {
		globalStatsViewNew = $(this).val();
		changeComponents(globalStatsViewNew);
	});
			//====Statistics View (Utilization Reservation ) user
	$( document ).on( "change", "#statsViewNew2", function() {
		globalStatsViewNew = $(this).val();
		console.log(globalStatsViewNew+"hooooooooooooooooooow");
		changeComponentsUser(globalStatsViewNew);
	});
			//====Statistics View (Detailed, Summary)
	$( document ).on( "change", "#viewStatSelect", function() {
		globalViewStatSelect = $(this).val();
//		DeviceSummaryTableTable();
		changeComponents(globalViewStatSelect);
	});
			//====Statistics View (Detailed, Summary) User
	$( document ).on( "change", "#StatSelectUser", function() {
		globalViewStatSelect = $(this).val();
//		DeviceSummaryTableTable();
		changeComponentsUser(globalViewStatSelect);
	});
			//========== Dropdown domain List
	$( document ).on( "change", "#statSelect", function() {
		globalStatSelect = $(this).val();
		console.log("qwer");
		changeComponents();
	});
			//========== Dropdown domain Filter 
	$( document ).on( "change", "#filterStat", function() {
		globalFilStatCom = $(this).val();
		console.log("globalFilStatCom"+globalFilStatCom);
		changeComponents();
	});
			//========== Dropdown User Filter 
	$( document ).on( "change", "#filterStatUsers", function() {
		globalFilStatCom = $(this).val();
		console.log("globalFilStatCom"+globalFilStatCom);
		UserDeatiledTable();
	});
			//=========== Add row Limits
	$(document).on('click', '#showMoreStat', function(){
		console.log('HUEHEHEHEHEH');
		showMoreStats();
	});
			//====

});
$(document).on('click', '#StatisticOptions', function() {
	$(".StatisticOption").addClass('animated wobble');
	setTimeout(function(){
//		console.log('======asdfgtrewq')
		$(".StatisticOption").removeClass('animated wobble');
		$.mobile.changePage($('#StatisticOption'),{
    		transition: "pop"
//		changeComponents();
    	});
	},1500);
});

$(document).on('click', '#TerminalSwitch', function(){
	var sTerminal = $('#StatTerminal').is(':checked');
	var sSwitch = $('#StatSwitch').is(':checked');
	if (sTerminal){
		globalTerminal = 'yes'
	}else{
		globalTerminal = 'no'
	}
	
	if (sSwitch){
		globalSwitch = 'yes'
	}else{
		globalSwitch = 'no'
	}
	changeComponents();
	$("#StatisticOption").addClass('animated tada');
//	setTimeout(function(){
	$("#StatisticOption").removeClass('animated tada'); 
	$.mobile.changePage( "pages/Stats/StatisticsDomains.html", {
		transition: "flow",
		reverse: false,
		changeHash: true
		});
//	},1500);
});
$(document).on('click', '#StatisticOptions', function() {
	if (globalStatSelect == 'Device' || globalStatSelect == 'Port'){
		$(".StatisticOption").addClass('animated wobble');
		setTimeout(function(){
//			console.log('======asdfgtrewq')
			$(".StatisticOption").removeClass('animated wobble');
				$.mobile.changePage($('#StatisticOption'),{
   		 			transition: "pop"
//		changeComponents();
    			});
		},1500);


	}else if (globalStatSelect == 'Slot' || globalStatSelect == 'Module'){
		$(".StatisticOption2").addClass('animated wobble');
		setTimeout(function(){
//			console.log('======asdfgtrewq')
			$(".StatisticOption2").removeClass('animated wobble');
				$.mobile.changePage($('#StatisticOption2'),{
   		 			transition: "pop"
//		changeComponents();
    			});
		},1500);
	
	} 
});

$(document).on('click', '#TerminalSwitch', function(){
//	var checkId = '';
	highLightId();
	var sTerminal = $('#StatTerminal').is(':checked');
	var sSwitch = $('#StatSwitch').is(':checked');
	if (sTerminal){
		globalTerminal = 'yes'
	}else{
		globalTerminal = 'no'
	}
	
	if (sSwitch){
		globalSwitch = 'yes'
	}else{
		globalSwitch = 'no'
	}
	changeComponents();


	$(".StatisticOption").addClass('animated tada');
	setTimeout(function(){
	$(".StatisticOption").removeClass('animated tada'); 
	$.mobile.changePage( "pages/Stats/StatisticsDomains.html", {
		transition: "flow",
		reverse: false,
		changeHash: true
		});
	},1500);
});
$(document).on('click', '#StatisticGraphButton', function() {
//	var checkId2 = [];
	var checkId2 = highLightId();
	console.log(checkId2+'-------checkId2------');
	if (checkId2.length == 0){
		$(".NoItemSelected").addClass('animated wobble');
		setTimeout(function(){
			console.log('======asdfgtrewq')
			$(".NoItemSelected").removeClass('animated wobble');
			$.mobile.changePage($('#NoItemSelected'),{
    			transition: "pop"
//			changeComponents();
    		});
		},1500);
	}else{
		console.log("wala pa");
		createGraph(checkId2);
		$(".StatisticDomainGraph").addClass('animated tada');
		setTimeout(function(){
			$(".StatisticDomainGraph").removeClass('animated tada'); 
			$.mobile.changePage($('#StatisticDomainGraph'), {
				transition: "flow",
				reverse: false,
				changeHash: true
			});
		},1500);
	}
});
$(document).on('click', '#StatisticReportButton', function() {
	if (globalStatisticsId.length == 0){
		$(".NoItemSelected").addClass('animated wobble');
		setTimeout(function(){
//			console.log('======asdfgtrewq')
			$(".NoItemSelected").removeClass('animated wobble');
			$.mobile.changePage($('#NoItemSelected'),{
    			transition: "pop"
//			changeComponents();
    		});
		},1500);
	}else{
		console.log("wala pa");
				$("#DeviceDetailedGen").addClass('animated tada');
				$("#DeviceDetailedGen").removeClass('animated tada'); 
				$.mobile.changePage( "DeviceDetailedGen.html", {
					transition: "flow",
					reverse: false,
					changeHash: true
		});
/*		if (globalStatSelect == 'Device'){
			if (globalViewStatSelect == 'Detailed'){
				$("#DeviceDetailedGen").addClass('animated tada');
				$("#DeviceDetailedGen").removeClass('animated tada'); 
				$.mobile.changePage( "DeviceDetailedGen.html", {
					transition: "flow",
					reverse: false,
					changeHash: true
		});
			}else if (globalViewStatSelect == 'Summary'){
				DeviceSummaryTable();
			}
		}else if (globalStatSelect == 'Rack'){
			if (globalViewStatSelect == 'Detailed'){
				RackDetailedTable();
			}else if (globalViewStatSelect == 'Summary'){
				RackSummaryTable();
			}
		}else if (globalStatSelect == 'Slot'){
			if (globalViewStatSelect == 'Detailed'){
				SlotDetailedTable();
			}else if (globalViewStatSelect == 'Summary'){
				SlotSummaryTable();
			}
		}else if (globalStatSelect == 'Module'){
	 		if (globalViewStatSelect == 'Detailed'){
				ModuleDetailedTable();
			}else if (globalViewStatSelect == 'Summary'){
				ModuleSummaryTable();
			}
		}else if (globalStatSelect == 'Port'){
			if (globalViewStatSelect == 'Detailed'){
				PortDetailedTable();
			}else if (globalViewStatSelect == 'Summary'){
				PortSummaryTable();
			}
		}else if (globalStatSelect == 'SubChannel'){
			if (globalViewStatSelect == 'Detailed'){
				SubChannelDetailedTable();
			}else if (globalViewStatSelect == 'Summary'){
				SubChannelSummaryTable();
			}

		}*/
	}
});
$(document).on('click', '#NoItemSelectedButton', function(){
	changeComponents();
	$(".StatisticOption").addClass('animated tada');
	setTimeout(function(){
	$(".StatisticOption").removeClass('animated tada'); 
	$.mobile.changePage( "pages/Stats/StatisticsDomains.html", {
		transition: "flow",
		reverse: false,
		changeHash: true
		});
	},1500);
});
$(document).on('click', '#CloseGraph', function(){
	changeComponents();
	setTimeout(function(){
	$.mobile.changePage( "pages/Stats/StatisticsDomains.html", {
		transition: "flow",
		reverse: false,
		changeHash: true

	},1500);
	});
});
$( document ).on( "pageinit", "#StatisticDomainGraph", function( event ) {
	changeComponents();
	var graph = 'createLine'; 
	createGraph();
	

});
$( document ).on( "click", "#LineGraph", function( event ) {
//	changeComponents();
	var graph = 'createLine'; 
	var graph2 = typeGraph(graph);
//	changeComponents();
	createGraph(graph2);
});
$( document ).on( "click", "#PieGraph", function( event ) {
//	changeComponents();
	var graph = 'createPie'; 
	var graph2 = typeGraph(graph);
	console.log(graph2);
//	changeComponents();
	createGraph('',graph2);
});
$( document ).on( "click", "#BarGraph", function( event ) {
//	changeComponents();
	var graph = 'createBar'; 
	var graph2 = typeGraph(graph);
//	changeComponents();
	createGraph('','createBar');
});
$( document ).on( "click", "#CloseGen", function( event ) {
	fileview = 'csv';
	getUlDomains();
	backToDomain2();
})
$( document ).on( "click", "#csvdevice", function( event ) {
	$("#csvdevice").attr('checked',true)
	$("#pdfdevice").attr('checked',false)
	//var fileview = 'csv';
});
$( document ).on( "click", "#pdfdevice", function( event ) {
	$("#csvdevice").attr('checked',false)
	$("#pdfdevice").attr('checked',true)
	//var fileview = 'pdf';
});
$( document ).on( "click", "#generate", function( event ) {
	generateReport();
});
$( document ).on( "pageinit", "#DeviceDetailedGen", function( event ) {
	HideShowUtilizatioReservation();
	createGraph(graph2);
});
//=============================================================================================

function initStatComponent(){
	$('#domain-table0-popup').css({'display':'none'});
	$('#domain-table2-popup').css({'display':'none'});
	$('#domain-table2-popup').css({'display':'none'});
	$('#domain-table3-popup').css({'display':'none'});
	$('#domain-table4-popup').css({'display':'none'});

}

/*swipe*/
$(document).on("swiperight", "#administrationPage", function () {
	$.mobile.changePage( $("#configEditorPage"), {
	  transition: "flow",
	  reverse: true,
	  changeHash: true
	});
});
$(document).on("swipeleft", "#administrationPage", function () {
	$.mobile.changePage( "../RM/RMReservationReserved.html", {
	  transition: "flow",
	  reverse: false,
	  changeHash: true
	});
});
$(document).on("swiperight", "#resourceManagementPage", function () {
	$.mobile.changePage( "../Admin/AdminUser.html", {
	  transition: "flow",
	  reverse: true,
	  changeHash: true
	});
});
$(document).on("swipeleft", "#resourceManagementPage", function () {
	$.mobile.changePage( "../PM/PMPDU.html", {
	  transition: "flow",
	  reverse: false,
	  changeHash: true
	});
});
$(document).on("swiperight", "#powerManagementPage", function () {
	$.mobile.changePage( "../RM/RMReservationReserved.html", {
	  transition: "flow",
	  reverse: true,
	  changeHash: true
	});
});
$(document).on("swipeleft", "#powerManagementPage", function () {
	$.mobile.changePage( "../Stats/StatisticsReservation.html", {
	  transition: "flow",
	  reverse: false,
	  changeHash: true
	});
});
$(document).on("swiperight", "#statisticsPage", function () {
	$.mobile.changePage( "../PM/PMPDU.html", {
	  transition: "flow",
	  reverse: true,
	  changeHash: true
	});
});



/*##################################################################################################*/

$(document).on("pageinit","#ResourcePop", function() {
	$.mobile.toolbar.prototype.options.addBackBtn = true;

	var str = "";
	for (var i = 0; i < globalDomainArray.length; i++) {

		str += "<li data-mini='true'><a href='#' id="+globalDomainArray[i]+">"+globalDomainArray[i]+"</a></li>";

		$(document).on("click", "#"+globalDomainArray[i], function () {
			$("#ResourcePop").dialog("close")
			setTimeout(function(){
			$.mobile.changePage( $("#configEditorPage"), {
        		  transition: "flow",
	        	  reverse: false,
	    	      changeHash: true
		    });
			},100);
			confirmDomain($(this).attr("id"))
		});
	}

	$("#domainlist").html(str);
	$("#domainlist").listview("refresh");
	setTimeout(function(){
		$("#ResourcePop").trigger("create");
	},100);

});


$(document).on("click", "#logOut", function () {
	signout();
});


/*###################################################################################################*/

/*PM Tree*/
$(document).on("click", "#imgPDU", function () {	
	$("#imgPDU").addClass('animated tada');
	LoadPowerManagement();
    setTimeout(function(){
		$("#imgPDU").removeClass('animated tada');
	    $.mobile.changePage( "pages/PM/PMPDU.html", {
    		transition: "flow",
      		reverse: true,
      		changeHash: true
    	});
	},1500);
});
$(document).on("click", "#imgDevices", function () {
	$("#imgDevices").addClass('animated tada');
	setTimeout(function(){
		$("#imgDevices").removeClass('animated tada');
	    $.mobile.changePage( "pages/PM/PMPDU.html", {
    		transition: "flow",
		    reverse: true,
      		changeHash: true
    	});
	},1500);
});
$(document).on("click", "#imgLogs", function () {
	$("#imgLogs").addClass('animated tada');
	setTimeout(function(){
		$("#imgLogs").removeClass('animated tada');
	    $.mobile.changePage( "pages/PM/PMPDU.html", {
    		transition: "flow",
      		reverse: true,
      		changeHash: true
    	});
	},1500);
});


/*Admin Tree*/
$(document).on("click", "#imgUsers", function () {
	$("#imgUsers").addClass('animated tada');
	setTimeout(function(){
		$("#imgUsers").removeClass('animated tada');
	    $.mobile.changePage( "pages/Admin/AdminUser.html", {
    	  transition: "flow",
	      reverse: true,
    	  changeHash: true
	    });
	loadUserTable();	
	},1500);
});
$(document).on("click", "#imgGroups", function () {
	$("#imgGroups").addClass('animated tada');
	setTimeout(function(){
	$("#imgGroups").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminGroup.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadGroupTable();
	},1500);
});
$(document).on("click", "#imgDomain", function () {
	$("#imgDomain").addClass('animated tada');
	setTimeout(function(){
	$("#imgDomain").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminDomain.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadDomainTable();	
	},1500);
});
$(document).on("click", "#imgAccRight", function () {
	$("#imgAccRight").addClass('animated tada');
	setTimeout(function(){
    $("#imgAccRight").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminAccRights.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadAccRightsTable();
	},1500);
});
$(document).on("click", "#imgServInfo", function () {
	$("#imgServInfo").addClass('animated tada');
	setTimeout(function(){
	$("#imgServInfo").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminServerInfo.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadServerInfoTable();	
	},1500);
});
$(document).on("click", "#imgAccess", function () {
	$("#imgAccess").addClass('animated tada');
	setTimeout(function(){
	$("#imgAccess").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminAccess.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadAccessTable();
	},1500);
});
$(document).on("click", "#imgEmailNotif", function () {
	$("#imgEmailNotif").addClass('animated tada');
	setTimeout(function(){
	$("#imgEmailNotif").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminEmail.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadEmailTable();
	},1500);
});
$(document).on("click", "#imgAdminLogs", function () {
	$("#imgAdminLogs").addClass('animated tada');
	setTimeout(function(){
	$("#imgAdminLogs").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminLogs.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadLogsTable();
	},1500);
});
$(document).on("click", "#imgVlan", function () {
	$("#imgVlan").addClass('animated tada');
	setTimeout(function(){
	$("#imgVlan").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminVLANTable.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadVLANTable();
	},1500);
});
$(document).on("click", "#imgPower", function () {
	$("#imgPower").addClass('animated tada');
	setTimeout(function(){
	$("#imgPower").removeClass('animated tada');
    $.mobile.changePage( "pages/Admin/AdminPower.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	loadPower();	
	},1500);
});


/*RM Tree*/
$(document).on("click", "#imgRMReserved", function () {
	$("#imgRMReserved").addClass('animated tada');
    setTimeout(function(){
	$("#imgRMReserved").removeClass('animated tada');
    $.mobile.changePage( "pages/RM/RMReservation.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	},1500);
});
$(document).on("click", "#imgRMConnectivity", function () {
	$("#imgRMConnectivity").addClass('animated tada');
	setTimeout(function(){
	$("#imgRMConnectivity").removeClass('animated tada');
    $.mobile.changePage( "pages/RM/RMReservationConnectivity.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	},1500);
});
$(document).on("click", "#imgRMPort", function () {
	$("#imgRMPort").addClass('animated tada');
	setTimeout(function(){
	$("#imgRMPort").removeClass('animated tada');
    $.mobile.changePage( "pages/RM/RMReservationPort.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	},1500);
});
$(document).on("click", "#imgRMDevices", function () {
	$("#imgRMDevices").addClass('animated tada');
	setTimeout(function(){
	$("#imgRMDevices").removeClass('animated tada');
    $.mobile.changePage( "pages/RM/RMReservationDevices.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	},1500);
});
$(document).on("click", "#imgRMHistory", function () {
	$("#imgRMHistory").addClass('animated tada');
	setTimeout(function(){
    $("#imgRMHistory").removeClass('animated tada');
    $.mobile.changePage( "pages/RM/RMReservationHistory.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	},1500);
});
$(document).on("click", "#imgRMEvent", function () {
	$("#imgRMEvent").addClass('animated tada');
    setTimeout(function(){
	$("#imgRMEvent").removeClass('animated tada');
    $.mobile.changePage( "pages/RM/RMEventScheduler.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	},1500);
});
$(document).on("click", "#imgRMSchedHist", function () {
    $.mobile.changePage( "pages/RM/RMScheduler.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
});

$(document).on("click", "#imgRMManage", function () {
	$("#imgRMManage").addClass('animated tada');
	setTimeout(function(){
	$("#imgRMManage").removeClass('animated tada');
    $.mobile.changePage( "pages/RM/RMManageDevice.html", {
      transition: "flow",
      reverse: true,
      changeHash: true
    });
	},1500);
});


/*Stats Tree*/
$(document).on("click", "#imgStatReservation", function () {
	$("#imgStatReservation").addClass('animated tada');
	setTimeout(function(){
	$("#imgStatReservation").removeClass('animated tada');
    $.mobile.changePage( "pages/Stats/StatisticsReservation.html", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
	},1500);
});
$(document).on("click", "#imgStatDomain", function () {
	$("#imgStatDomain").addClass('animated tada');
	setTimeout(function(){
	$("#imgStatDomain").removeClass('animated tada');
    $.mobile.changePage( "pages/Stats/StatisticsDomains.html", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
	
	$(".ShowGraph").hide();
	},1500);
});
$(document).on("click", "#imgStatUser", function () {
	$("#imgStatUser").addClass('animated tada');
	setTimeout(function(){
	$("#imgStatUser").removeClass('animated tada');
    $.mobile.changePage( "pages/Stats/StatisticsUser.html", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
	},1500);

});

$(document).on("click", "#okButton", function () {
	setTimeout(function(){
    $.mobile.changePage( "#configEditorPage", {
      transition: "flow",
    });
	},1500);
});
$(document).on("click", "#yesButton", function () {
	setTimeout(function(){
    $.mobile.changePage( "#configEditorPage", {
      transition: "flow",
    });
	},1500);
});
$(document).on("click", "#noButton", function () {
	setTimeout(function(){
	    $.mobile.changePage( "#configEditorPage", {
    	  transition: "flow",
    	});
		cancelReservation();
	},1500);
});

$(document).on("click", "#viewOptionsButton", function () {
    setTimeout(function(){
	if(viewconfigname == true){
		$("#checkConfigname").attr('checked',true)
		viewconfigname = true;	
	}
    if(viewhostname == true){
        $("#checkhostname").attr('checked',true)
		viewhostname = true;
    }
    if(viewmanagementip == true){
        $("#checkmanagementip").attr('checked',true)
		viewmanagementip = true;
    }
    if(viewconsoleip == true){
        $("#checkconsoleip").attr('checked',true)
		viewconsoleip = true;
    }
    if(viewloopbackadd == true){
        $("#checkloopbackadd").attr('checked',true)
		 viewloopbackadd = true;
    }
    if(viewosversion == true){
        $("#checkosversion").attr('checked',true)
		viewosversion = true;
    }
    if(viewsoftwarepack == true){
        $("#checksoftwarepack").attr('checked',true)
		viewsoftwarepack = true;
    }
    if(viewinterfaceip == true){
        $("#checkinterfaceip").attr('checked',true)
		viewinterfaceip = true;
    }
    if(viewinterfacename == true){
        $("#checkinterfacename").attr('checked',true)
		viewinterfacename = true;
    }
	$.mobile.changePage( "#CustomViewPopUp", {
      transition: "flow",
    });
    },1500);
});
/*$(document).on("click", "#viewTools", function () {
    setTimeout(function(){
    $.mobile.changePage( "#CustomViewPopUp", {
      transition: "flow",
    });
    },1500);
});*/
$(document).on("click", "#liDevSan", function () {
	globalSanityFeature = "deviceSanity";
//	SanityFlag = true;
	autoTrigger('deviceSanity');
});
$(document).on("click", "#liAccSan", function () {
//	SanityFlag = true;
	globalSanityFeature = "accessSanity";
	autoTrigger('accessSanity');
});
$(document).on("click", "#liConn", function () {
	globalSanityFeature = "connectivity";
//	SanityFlag = true;
	autoTrigger('connectivity');
});
$(document).on("click", "#liLinkSan", function () {
	globalSanityFeature = "linksanity";
//	SanityFlag = true;
	autoTrigger('linksanity');
});
$(document).on("click", "#liEnaInt", function () {
	globalSanityFeature = "enableint";
//	SanityFlag = true;
	autoTrigger('enableint');
});
$(document).on("click", "#liLoadImg", function () {
	globalSanityFeature = "loadImage";
//	SanityFlag = true;
	autoTrigger('loadImage');
});
$(document).on("click", "#liLoadConf", function () {
	globalSanityFeature = "loadConfig";
//	SanityFlag = true;
	autoTrigger('loadConfig');
});


$(document).on("click", "#deviceList", function () {
	$("#rightDeviceSubList").show();
	$("#deviceToolsSubList").hide();
	$("#deviceSubList").show();
    $("#logsSubList").hide();
});
$(document).on("click", "#deviceToolsList", function () {
	$("#rightDeviceSubList").show();
    $("#deviceSubList").hide();	
    $("#toolsSubList").show();
    $("#logsSubList").hide();
});
$(document).on("click", "#logsList", function () {
	$("#rightSubList").show();
    $("#deviceSubList").hide();	
    $("#toolsSubList").hide();
    $("#logsSubList").show();
    $("#deviceToolsSubList").show();
});
$(document).on("click", "#delDevDevMenu", function () {
	dragtoTrash(glblDevMenImg,gblDevMenX,gblDevMenY,"true");
	$("#deviceMenuPanel").popup("close");
});
$(document).on("click", "#linkList", function () {
    $("#rightLinkSubList").show();
    $("#linkSubList").show();
});
$(document).on("click", "#delLinkDevMenu", function () {
	deleteLink(gblLinkSource,gblLinkDestination);
	$("#linkMenuPanel").popup("close");
});

/* device mepping */
$(document).on("click", "#deviceMapDevMenu", function () {
	$("#deviceMenuPanel").popup("close");
	setTimeout(function(){
	    $.mobile.changePage($('#ConfigManagePop'),{
    	    transition: "pop"
        });
	//	dragtoTrashDeviceOnly(glblDevMenImg,gblDevMenX,gblDevMenY,"true");
		globalManageDeviceShow = "tooltipDevice";
		deviceListPopupTable('tooltipDevice'); 
   	},1500);
});
/*Device Configuration*/
$(document).on('pagebeforeshow', '#deviceConfig', function (e, ui) {
	$('#deviceConfig div[role="dialog"]').css({"max-width":"900px"});
});
$(document).on("click", "#devConfDevMenu", function () {
	loadDeviceConfig(glblDevMenImg);
	$.mobile.changePage( "#deviceConfig", {
    	transition: "pop",
		changeHash: false
    });
});
$(document).on("click", "#okDeviceConf", function () {
	var chk = $("#exclusivityChk").is(":checked");
	loadDeviceConfigOk(glblDevMenImg,chk);
	$("#deviceConfig").dialog("close");
});
$(document).on("click", "#cancelDeviceConf", function () {
	$("#deviceConfig").dialog("close");
});

$(document).on("click", "#btnDoneResult", function () {
	clearTimeout(TimeOut);	
//	SanityFlag =  false;
	dialog('close');
	cancelLoadSaveQuery('done');
});
$(document).on("click", "#btnCancelResult", function () {
	clearTimeout(TimeOut);	
//	SanityFlag =  false;
	cancelLoadSaveQuery('cancel',globalSanityFeature);
});
$(document).on("click", "#btnRefreshResult", function () {
	clearTimeout(TimeOut);	
//	SanityFlag =  false;
	sanityQuery(globalSanityFeature);
});

/*Device Menu Auto Discover*/
$(document).on("click", "#autoDDevMenu", function () {
	$.mobile.changePage( "#autoDisDevConfig", {
        transition: "pop",
        changeHash: false
    });
});
$(document).on("click", "#cancelAutoDStatus", function () {
	var execFunc = "clearTimeout\(initAutoD\);";
	//execFunc += "$(\"#customPage\").dialog(\"close\");";
	//execFunc += "setTimeout(function(){toConfig();},100);";
	//execFunc += "cancelOngoingAutoD();";
	execFunc += "if(cancelAutoDQuery()==false){ alertUser('Cancellation Failed'); return;}";
	execFunc += "else{toConfig();}";
	confirmation("Cancel auto discovery of the device?","Confirmation",execFunc);
});
$(document).on("click", "#okAutoDStatus", function () {
	if(autoDcomplete){
		/*-----cath popup for device info here-----*/
		//if(!gatherDataAutoD()){return;}
		//$('#newDeviceDialog').dialog("close");
		//initializenewDeviceDialog("");
		autoDSaveInfo();
		autoDcomplete = false;
	}else{
		clearTimeout(initAutoD);
		initAutoD = "";
		//$("#customPage").dialog("close");
		toConfig();
		autoDcomplete = false;
	}
});
/*kmmabignay - clickHandlers*/
onClickAction("toolsSoftOpt","barsPanel");
onClickAction("toolsConfigOpt","barsPanel");
onClickAction("toolsShowActOpt","barsPanel");
onClickAction("toolsLinkSanOpt","barsPanel");
onClickAction("devToolsOpt","deviceMenuPanel");
onClickAction("devToolsConfOpt","deviceMenuPanel");
onClickAction("devToolsSoftOpt","deviceMenuPanel");
onClickAction("devToolsLinkSanOpt","deviceMenuPanel");
/*----------------------------------------------*/

$(document).on("click", "#okAutoDDeviceConf", function () {
    $("#autoDisDevConfig").dialog("close");
});
$(document).on("click", "#cancelAutoDDeviceConf", function () {
    $("#autoDisDevConfig").dialog("close");
});

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/10/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

/*New Device  */
$(document).on("click", "#deviceSubNew", function () {
	AutoDType = 'device';
	newDevice("device");
	$('#newTestToolDialogContent').empty();
	$('#newServerDialogContent').empty();
	$("#deviceMain").popup("close");
	loadNewDeviceContent("Manual","first");
});

/*
 *
 *  FUNCTION NAME : loadNewDeviceContent
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/18/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function loadNewDeviceContent(showOpt,loadF){
	setTimeout(function(){
    	$.mobile.changePage( "#newDeviceDialog", {
        	transition: "pop",
	        changeHash: true
    	});
		var container = $('#newDeviceDialogContent');
		var contentadd;
		if(showOpt.toLowerCase()=="manual"){
			contentadd = 'pages/ConfigEditor/autoDNewDeviceManual.html';
		}else if(showOpt.toLowerCase()=="auto"){
			contentadd = 'pages/ConfigEditor/autoDNewDeviceAuto.html';
		}
		container.empty().load(contentadd, 
			function () {
				$("#newDeviceDialog").trigger('create');
				$('#addNewDevDomainOpt').empty().append(autoDDomainOptions);
				initnewDeviceDialog();
				if(loadF){
					initializenewDeviceDialog("",loadF);
				}
				else{initializenewDeviceDialog("");}
				showAddManualAutoD(showOpt);
		});
		
	},350);
	setAutoDVariable();
}

/*
 *
 *  FUNCTION NAME : initializenewDeviceDialog
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/10/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function initializenewDeviceDialog(excl,loadF,prev) {

	$('#addNewDevMapPart').hide();

	if(loadF=="first"){
		$('#newDevAddOpt-button > span').empty().append("Manual");
		$('#newDevAddOpt > option:contains("Manual")').prop('selected',true);
	}

	if(prev){
		$('#addDevTypeOpt-button > span').empty().append(prev);
		$('#addDevTypeOpt > option:contains('+prev+')').prop('selected',true);
	}else{
		$('#addDevTypeOpt-button > span').empty().append("Select");
		$('#addDevTypeOpt > option:contains("Select")').prop('selected',true);
	}

	$('#addNewDevTypeHOpt-button > span').empty().append("Select");
	$('#addNewDevTypeHOpt > option:contains("Select")').prop('selected',true);

	if(excl.split(",").indexOf("domain")==-1){
		$('#addNewDevDomainOpt-button > span').empty().append("Select");
		$('#addNewDevDomainOpt > option:contains("Select")').prop('selected',true);
	}

	$('#addNewDevManuOpt-button > span').empty().append("Select");
	$('#addNewDevManuOpt > option:contains("Select")').prop('selected',true);


	$('#addNewDevAuxIp').val("");
	$('#addNewDevAuxIp').hide();

	$('#addNewDevMmgmtIp').val("");
	$('#addNewDevMmgmtIp').attr("disabled","disabled");

	$('#addNewDevConIp').val("");
	$('#addNewDevConIp').attr("disabled","disabled");

	$('#addNewDevUserN').val("");
	$('#addNewDevUserN').attr("disabled","disabled");

	$('#addNewDevCPassW').val("");
	$('#addNewDevCPassW').attr("disabled","disabled");

	$('#addNewDevOptValChk').attr("checked",false);
	$('#addNewDevOptValChk').attr("disabled","disabled");

	//showAddManualAutoD("Manual");

	$('#addNewDevIncPartPChk').attr("checked",false);
	$('#addNewDevIncPartPChk').attr("disabled","disabled");

	$('#addNewDevMapPartPChk').attr("checked",false);
	$('#addNewDevMapPartPChk').attr("disabled","disabled");

	$('#addNewDevMmgmtIpPort').val("");
	$('#addNewDevMmgmtIpPort').attr("disabled","disabled");

	$('#addNewDevConIpPort').val("");
	//$('#addNewDevConIpPort').attr("disabled","disabled");

	$('#addNewDevMmgmtIpPortChk').attr("checked",false);
	$('#addNewDevMmgmtIpPortChk').checkboxradio("refresh");
	$('#addNewDevMmgmtIpPortChk').attr("disabled","disabled");

	$('#addNewDevConIpPortChk').attr("checked",true);
	$('#addNewDevConIpPortChk').checkboxradio("refresh");
	$('#addNewDevConIpPortChk').attr("disabled","disabled");

	$('#addNewDevIncPartPChk').attr("checked",false);
	$('#addNewDevIncPartPChk').checkboxradio("refresh");
	$('#addNewDevIncPartPChk').attr("disabled","disabled");
	initPartnerInfosMobile();

}

/*
 *
 *  FUNCTION NAME : initPartnerInfosMobile
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/10/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function initPartnerInfosMobile() {
	$('#autoDPartnerInfoCont').hide();
	$('#autoDPartInfo1').hide();
	$('#autoDPartInfo2').hide();

	$('#autoDOptIncMappChk').hide();
	$('#autoDOptSrchDetailsChk').attr("checked",false);
	$('#autoDOptSrchDetailsChk').checkboxradio("refresh");
	$('#autoDIncMapPortsChk').attr("checked",false);
	$('#autoDIncMapPortsChk').checkboxradio("refresh");
	
	$('#newDevPartnerDevManuS').val('No Selection');
	$('#newDevPartnerDevHostS').val('No Selection');
	$('#newDevPartnerDevModelS').val('No Selection');

	$('#autoDPartPortsSrchLblCont').hide();
	$('#autoDPartnerInfoTableCont').hide();
	$('#autoDDevSlotsIncCont').hide();
	$('#autoDDevSlotsIncCountCont').hide();
	$('#autoDDevSlotInfoTableCont').hide();
	$('#autoDbreakline').hide();

	$('#autoDPartnerInfoTbody').empty();

}

/*
 *
 *  FUNCTION NAME : initnewDeviceDialog
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/10/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function initnewDeviceDialog(){

	$(document).on("change","#newDevAddOpt", function () {
		var loadtype = $('#newDevAddOpt > option:selected').text();
		loadNewDeviceContent(loadtype);
	});

	$(document).on("change","#addDevTypeOpt", function () {
		var loadtype = $('#newDevAddOpt > option:selected').text();
		var origType = $('#addDevTypeOpt > option:selected').text();
		initializenewDeviceDialog("","",origType);
		switchManuForNewDevice($('#addDevTypeOpt > option:selected').text());
	});

	$(document).on("change","#addNewDevManuOpt", function () {
		if($('#addNewDevManuOpt > option:selected').text()=="Select"){
			switchManuForNewDevice("Select");
		}else{
			$('#addNewDevMmgmtIp').removeAttr("disabled");
			$('#addNewDevConIp').removeAttr("disabled");
			$('#addNewDevUserN').removeAttr("disabled");
			$('#addNewDevCPassW').removeAttr("disabled");
			$('#addNewDevOptValChk').removeAttr("disabled");
		}
	});

	$("#addNewDevMmgmtIpPortChk").bind("click", function () {
		if($(this).is(':checked')){
			$('#addNewDevMmgmtIpPort').removeAttr("disabled");
		}else{
			$('#addNewDevMmgmtIpPort').attr("disabled","disabled");
		}
	});

	$("#addNewDevConIpPortChk").bind("click", function () {
		if($('#addNewDevConIpPortChk').is(':checked')){
			$('#addNewDevConIpPort').removeAttr("disabled");
		}else{
			$('#addNewDevConIpPort').attr("disabled","disabled");
			$('#addNewDevConIpPort').val("");
		}
	});

	$(document).on("keypress","#addNewDevMmgmtIp", function () {
		if($(this).val()!=""){
			if($(this).val )

			$('#addNewDevMmgmtIpPortChk').removeAttr("disabled");
			$('#addNewDevIncPartPChk').removeAttr("disabled");
			$('#addNewDevMapPartPChk').removeAttr("disabled");
		}else{
			$('#addNewDevMmgmtIpPort').val("");
			$('#addNewDevMmgmtIpPortChk').attr("disabled","disabled");
			$('#addNewDevMmgmtIpPortChk').attr("checked",false);
			$('#addNewDevIncPartPChk').attr("disabled","disabled");
			$('#addNewDevMapPartPChk').attr("disabled","disabled");
		}
	});

	$(document).on("blur","#addNewDevMmgmtIp", function () {
		if($(this).val()!=""){
			$('#addNewDevMmgmtIpPortChk').removeAttr("disabled");
			$('#addNewDevIncPartPChk').removeAttr("disabled");
			$('#addNewDevMapPartPChk').removeAttr("disabled");
		}else{
			$('#addNewDevMmgmtIpPort').val("");
			$('#addNewDevMmgmtIpPortChk').attr("disabled","disabled");
			$('#addNewDevMmgmtIpPortChk').attr("checked",false);
			$('#addNewDevIncPartPChk').attr("disabled","disabled");
			$('#addNewDevMapPartPChk').attr("disabled","disabled");
		}
	});

	$("#addNewDevOptValChk").bind("click", function () {
		if($('#addNewDevOptValChk').is(':checked')){
			$('#addNewDevAuxIp').show();
		}else{$('#addNewDevAuxIp').hide();}
	});

	$("#addNewDevIncPartPChk").bind("click", function () {
		initPartnerInfosMobile();
		if($('#addNewDevIncPartPChk').is(':checked')){
			switchDevicePartnerAutoD($('#addDevTypeOpt > option:selected').text());
			$('#autoDPartnerInfoCont').show();
			$('#autoDbreakline').show();
		}else{
			$('#autoDPartnerInfoCont').hide();
			$('#autoDbreakline').hide();
		}
	});

	$(document).on("change","#autoDPartTypeOpt", function () {
		$('#autoDPartAddOpt > option:contains("Select")').prop('selected',true);
		$('#autoDPartAddOpt-button > span').empty().append("Select")
		getAutoDSelectedPartnerAdd("Select","device");
		getAutoDSelectedPartnerAdd($('#autoDPartTypeOpt > option:selected').text(),"device");
	});

	$(document).on("change","#autoDPartAddOpt", function () {
		showNewPartnerInfo($('#autoDPartTypeOpt > option:selected').text(),"device");
	});

	$("#autoDOptSrchDetailsChk").bind("click", function () {
		if($(this).is(':checked')){
			$('#autoDPartPortsSrchLblCont').show();
		}else{
			$('#autoDPartPortsSrchLblCont').hide();
		}
	});

	$("#autoDDevSlotsIncChk").bind("click", function () {
		if($("#autoDDevSlotsIncChk").is(':checked')){
			$('#autoDDevSlotsIncCountCont').show()
		}else{
			$('#autoDDevSlotsIncCountCont').hide()
		}
	});

	$(document).on("keypress","#autoDDevSlotsIncCount", function () {
		var key = event.keyCode;
	    if (key == 13) {
			createDevSlotTbodyAutoD($(this).val(),"device");
		}
	});

	$(document).on("blur","#autoDDevSlotsIncCount", function () {
		createDevSlotTbodyAutoD($(this).val(),"device");
	});
	
//	$(document).on("click","#okAutoDDevice", function () {
	$("#okAutoDDevice").click( function () {
		if(!gatherDataAutoD("device")){return;}
		//checkDeviceInDb query
		checkDeviceInDbAutoD();
		//autoDSaveInfo();
	});

	$(document).on("click","#cancelAutoDDevice", function () {
		initializenewDeviceDialog("");
		//$('#newDeviceDialog').empty();
		$('#newDeviceDialog').dialog("close");
	});

}

/*
 *
 *  FUNCTION NAME : doSaveAutoDevice
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/19/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function doSaveAutoDevice(tmpidx) {
	console.log("try to create args");
	var autoDArg = createDataAutoD();
	if(newDeviceAutoD(autoDArg)==false){return;}
	//if(newDeviceAutoD(autoDDevData[0])==false){return;}

	/* showPopup auto-d logs */
	var tmpip = autoDDevData[tmpidx].ManagementIp;
	if(tmpip==""){tmpip = autoDDevData[tmpidx].ConsoleIp+":"+autoDDevData[tmpidx].ConsolePort}
	showAutoDiscPage(autoDDevData[tmpidx].LogsName,globalUserName,tmpip,autoDDevData[tmpidx].PartnerIp);

	$('#newDeviceDialog').dialog("close");
	$('#newTestToolDialog').dialog("close");
	//initializenewDeviceDialog("");
	autoDcomplete = false;


}

/*
 *
 *  FUNCTION NAME : createDevSlotTbodyAutoD
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/13/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function createDevSlotTbodyAutoD(val,type) {
	if(parseInt(val)>0){
		var input = "";
		for(i = 0;i<parseInt(val);i++) {
			input += "<tr><td><input placeholder='Slot:' style='text;border:none;font-size:16px;'></td>";
			input += "<td><input placeholder='Port Count:' style='text;border:none;'></td></tr>";
		}
		if(type=="device"){
			var aswidth = $('#autoDPartnerInfoField').width()/2;
			$('#autoDDevSlotNum').width(aswidth);
			$('#autoDDevSlotPortSrch').width(aswidth);
			$('#autoDDevSlotInfoTbody').empty().append(input);
			$('#autoDDevSlotInfoTableCont').show();	
		}else if(type=="testtool"){
			var aswidth = $('#autoDTestTPartnerInfoField').width()/2;
			$('#autoDTestTSlotNum').width(aswidth);
			$('#autoDTestTSlotPortSrch').width(aswidth);
			$('#autoDTestTSlotInfoTbody').empty().append(input);
			$('#autoDTestTSlotInfoTableCont').show();
			$('#autoDTestTSlotInfoTable').show();
		}
	}else{
		if(type=="device"){
			$('#autoDDevSlotInfoTbody').empty();
			$('#autoDDevSlotInfoTableCont').hide();	
		}else if(type=="testtool"){
			$('#autoDTestTSlotInfoTbody').empty();
			$('#autoDTestTSlotInfoTableCont').hide();	
		}
	}

}

/*
 *
 *  FUNCTION NAME : switchManuForNewDevice
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 03/13/14
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function switchManuForNewDevice(opt) {
	var optAdd = "<option value=''>Select</option>";
	switch(opt){
		case "Select": case "":
			initializenewDeviceDialog("domain");
		break;
		case "L1 Switch":
			optAdd += "<option>MRV</option><option>NetScout</option><option>GLX</option>";
		break;
		case "L2 Switch": case "Networking Device": case "Appliance": case "TerminalServer":
			optAdd += "<option>Cisco</option><option>Juniper</option>";
		break;
	}
	$('#addNewDevManuOpt').empty().append(optAdd);
	$('#knowmanuS').empty().append(optAdd);
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
/*----- cbobis 03/12/14 -------------------------------------------*/
function showAddManualAutoD(opt) {
	var devtype = "<option>Select</option>"+
		"<option>L1 Switch</option>"+
		"<option>L2 Switch</option>"+
		"<option>Networking Device</option>"+
		"<option>Appliance</option>"+
		"<option>Terminal Server</option>";
	$('#addDevTypeOpt-button > span').empty().append('Select');

	switch(opt){
		case "Auto":
			//loadNewDeviceContent("auto");
			$('#addDevTypeOpt').empty().append(devtype);
			$('#addManualNewDevHostName').hide();
			$('#addNewDevIncPartP').show();	
			$('#addNewDevMapPart').hide();
			$('#autoDPartnerInfoCont').hide();
			$('#addNewDevManuOptAuto').show();
			$('#addNewDevManuOptManual').hide();
		break;
		case "Manual":
			//loadNewDeviceContent("manual");
			devtype += "Pass through device";
			$('#addDevTypeOpt').empty().append(devtype);
			$('#addManualNewDevHostName').show();
			$('#addNewDevIncPartP').hide();	
			$('#addNewDevMapPart').show();
			$('#autoDPartnerInfoCont').hide();
			$('#addNewDevManuOptAuto').hide();
			$('#addNewDevManuOptManual').show();
		break;
	}
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
/*Save Auto Discovered Device*/
/*----- cbobis 03/17/14 -------------------------------------------*/
function autoDSaveInfo() {
	setTimeout(function(){
    	$.mobile.changePage( "#autoDSaveDialog", {
        	transition: "pop",
	        changeHash: true
    	});
		$('#autoDSaveDialogContent').empty().load('pages/ConfigEditor/autoDSaveInfo.html', 
		function(){
			$("#autoDSaveDialog").trigger('create');
			//$('#autoDSavePowerMan').hide();
			$('#autoDSaveFusionInfo').hide();
			$('#autoDSaveNATTableCont').hide();	
			$('#autoDSaveNATContent').empty();	
			$('#autoDSavePowerTableCont').hide();
			$('#autoDSavePowerTbody').empty();
			autoDCompleteDevInfo(autoDDevData[0].ManagementIp);
		});
	},350);
}

$(document).on("pageinit", "#autoDSaveDialog", function (event) {

	$(document).on("click", "#okSaveAutoD", function () {
		var saveargs = gatherAddInfoAutoD();
		if(saveAutoDAddInfoQuery(saveargs)==false){
			return;
		}
		/*else{
			if(!autoDDevData[0].Type.toLowerCase().match(/switch/g) 
				&& !autoDDevData[0].Type.toLowerCase().match(/terminal server/g) 
				&& !autoDDevData[0].Type.toLowerCase().match(/power/g) 
				) {
				autoDCompleteDevInfo(autoDDevData[0].ManagementIp,"load");
			}
		}*/
    	$.mobile.changePage( "#configEditorPage", {
   	    	transition: "flow"
   		});
		alertUser("Process Complete");
	});
	$(document).on("click", "#cancelSaveAutoD", function () {
		var execFunc = "getDataForDeviceListJSON(saveAutoDDevNode); drawImage(); saveAutoDDevNode = [];autoDCurIdx = -1;";
		execFunc += "toConfig();";
		
		confirmation("Cancel saving optional device info?","Confirmation",execFunc);
	});
	

});

$(document).on("keypress","#autoDSaveNatAddCount", function () {
	var key = event.keyCode;
    if (key == 13) {
		createNATTbodyAutoD($(this).val());
	}else{
		return checkNumberInputChar(event);
	}
});

$(document).on("blur","#autoDSaveNatAddCount", function () {
	createNATTbodyAutoD($(this).val());
});



/*New TestTool*/
$(document).on("click", "#testToolSubNew", function () {
	AutoDType = 'testtool';
	$("#testToolMain").popup("close");
	newDevice("testtool");
	loadTestToolServerContent("testtool","manual");
});

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function loadTestToolServerContent(type,showOpt){
	setTimeout(function(){
		$('#newDeviceDialogContent').empty();
		if(type=="testtool"){
			var targetDlg = "#newTestToolDialog";
			$('#newServerDialogContent').empty();
		}else{
			var targetDlg = "#newServerDialog";
			$('#newTestToolDialogContent').empty();
		}
    	$.mobile.changePage( targetDlg, {
        	transition: "pop",
	        changeHash: true
    	});
		
		var container;
		var contentadd;
		if(type=="testtool"){
			container = $('#newTestToolDialogContent');
			if(showOpt=="manual"){
				contentadd = 'pages/ConfigEditor/manualAddNewTestTool.html';
			}else if(showOpt=="auto"){
				contentadd = 'pages/ConfigEditor/autoDNewTesttool.html';
			}
		}else if(type=="server"){
			container = $('#newServerDialogContent');
			if(showOpt=="manual"){
				contentadd = 'pages/ConfigEditor/manualAddNewServer.html';
			}else if(showOpt=="auto"){
				contentadd = 'pages/ConfigEditor/autoDNewTesttool.html';
			}
		}
		container.empty().load(contentadd, 
			function () {
				$(targetDlg).trigger('create');
				//if(showOpt=="auto"){
					initnewTestDialogObjs(type);
					$('#addNewTestTDomainOpt').empty().append(autoDDomainOptions);
					initializenewTestDialog(showOpt);
				//}
				//disEnNewTestTDlgPObjs("disable");
		});
		
		//initializenewTestDialog("manual");
	},350);
	setAutoDVariable();

}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function initializenewTestDialog(opt) {
	if(opt=="auto"){
		$('#addNewTestTIncPartP').show();
		$('#addNewTestTMapPart').hide();
		$('#addNewTestTManuOptManual').hide();
		$('#addNewTestTManuOptAuto').show();
		$('#addNewTestTManuOpt').attr("disabled","disabled");

	}else{
		$('#addNewTestTIncPartP').hide();
		$('#addNewTestTMapPart').show();
		$('#addNewTestTManuOptManual').show();
		$('#addNewTestTManuOptAuto').hide();
	}
	$('#autoDTestTPartnerInfoCont').hide();
	$('#addNewTestTAuxIp').hide();
	hideShowTestToolPartner("hide");
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function initnewTestDialogObjs(type) {
	disEnNewTestTDlgPObjs("disable");
	$('#addNewTestTManuOptManualTxt').attr("disabled","disabled");
	var optadd = "<option>Select</option>";
	if(type=="testtool"){
		$('#addNewTestTTypeHOptLbl').hide();
		$('#addNewTestTTypeHOptCont').hide();
		optadd += "<option>Agilent</option><option>Ixia</option><option>Spirent</option>"
	}else{
		$('#addNewTestTTypeHOptLbl').show();
		$('#addNewTestTTypeHOptCont').show();
		optadd += "<option>Cisco</option>"
	}
	$('#addNewTestTManuOpt').empty().append(optadd);
	
    $('#addNewTestTConIpPortChk').attr("checked",true).checkboxradio("refresh");

	$(document).on("change","#newTestTAddOpt", function() {
		var opt = $('#newTestTAddOpt > option:selected').text();
		$('#newTestTAddOpt-button > span').empty().append(opt)
		if(opt=="Auto"){
			$('#addNewTestTManuOptAuto').attr("disabled","disabled");
			loadTestToolServerContent("testtool","auto");
		}else{
			$('#addNewTestTManuOptAuto').attr("disabled","disabled");
			loadTestToolServerContent("testtool","manual");
		}
	});

	$(document).on("change","#newServerAddOpt", function() {
		var opt = $('#newServerAddOpt > option:selected').text();
		$('#newServerAddOpt-button > span').empty().append(opt)
		if(opt=="Auto"){
			$('#addNewTestTManuOptAuto').attr("disabled","disabled");
			loadTestToolServerContent("server","auto");
			//initializenewTestDialog("auto");
		}else{
			$('#addNewTestTManuOptManual').attr("disabled","disabled");
			loadTestToolServerContent("server","manual");
			//initializenewTestDialog("manual");
		}
	});


	$(document).on("change","#addNewTestTDomainOpt", function() {
		var opt = $('#addNewTestTDomainOpt > option:selected').text();
		$('#addNewTestTDomainOpt > span').empty().append(opt);
	});

	$(document).on("change","#addNewTestTManuOpt", function() {
		var opt = $('#addNewTestTManuOpt > option:selected').text();
		$('#addNewTestTManuOpt > span').empty().append(opt);
		if(opt!="Select"){
			disEnNewTestTDlgPObjs("enable");
		}
	});

	$("#addNewTestTMmgmtIpPortChk").bind("click", function (){
		if($('#addNewTestTMmgmtIpPortChk').is(':checked')){
			$('#addNewTestTMmgmtIpPort').removeAttr("disabled");
		}else{
			$('#addNewTestTMmgmtIpPort').attr("disabled","disabled");
			$('#addNewTestTMmgmtIpPort').val("");
		}
	});

	$("#addNewTestTIncPartPChk").bind("click", function (){
		if($('#addNewTestTIncPartPChk').is(':checked')){
			$('#autoDTestTPartnerInfoCont').show();
		}else{
			$('#autoDTestTPartnerInfoCont').hide();
		}
	});

	$(document).on("keypress","#newTestTHostname", function () {
		if($(this).val()==""){
			disEnNewTestTDlgPObjs("disable");
			$('#addNewTestTManuOpt').attr("disabled","disabled");
		}else{
			$('#addNewTestTManuOpt').removeAttr("disabled");
		}
	});

	$(document).on("blur","#newTestTHostname", function () {
		if($(this).val()==""){
			disEnNewTestTDlgPObjs("disable");
			$('#addNewTestTManuOpt').attr("disabled","disabled");
		}else{
			$('#addNewTestTManuOpt').removeAttr("disabled");
		}
	});
	
	$(document).on("change","#autoDTestTPartTypeOpt", function() {
		var opt = $('#autoDTestTPartTypeOpt > option:selected').text();
		getAutoDSelectedPartnerAdd(opt,"testtool");
		$('#autoDTestTSlotsIncCountCont').hide()
	});

	$(document).on("change","#autoDTestTPartAddOpt", function () {
		showNewPartnerInfo($('#autoDTestTPartTypeOpt > option:selected').text(),"testtool");
		showautoDPortSrchTableByNum(3);
		$('#autoDTestTSlotsIncCountCont').hide()
	});

	$("#autoDTestTOptSrchDetailsChk").bind("click", function () {
		if($(this).is(':checked')){
			$('#autoDTestTPartPortsSrchLblCont').show();
			$('#autoDTestTPartPortsSrchNumLbl').hide();
			$('#autoDTestTPartPortsSrchNumCont').hide();
		}else{
			$('#autoDTestTPartPortsSrchLblCont').hide();
		}
	});

	$("#autoDTestTSlotsIncChk").bind("click", function () {
		if($("#autoDTestTSlotsIncChk").is(':checked')){
			$('#autoDTestTSlotsIncCountCont').show()
			$('#autoDTestTSlotInfoTableCont').hide();
		}else{
			$('#autoDTestTSlotsIncCountCont').hide();
			$('#autoDTestTSlotInfoTableCont').hide();
		}
	});

	$(document).on("keypress","#autoDTestTSlotsIncCount", function () {
		var key = event.keyCode;
	    if (key == 13) {
			createDevSlotTbodyAutoD($(this).val(),"testtool");
		}
	});

	$(document).on("blur","#autoDTestTSlotsIncCount", function () {
		createDevSlotTbodyAutoD($(this).val(),"testtool");
	});

//	$(document).on("click","#okAutoDTestT", function () {
	$("#okAutoDTestT").click( function () {
		if(!gatherDataAutoD("testtool")){return;}

		//checkDeviceInDb query
		checkDeviceInDbAutoD();

	});

	$(document).on("click","#cancelAutoDTestT", function () {
		$('#newTestToolDialog').dialog("close");
		$('#newServerDialog').dialog("close");
		$('#newTestToolDialogContent').empty();
		$('#newServerDialogContent').empty();
	});

}

/*function saveAutoDTestT(){
	console.log("ON CLICK");
	if(!gatherDataAutoD("testtool")){return;}

	//checkDeviceInDb query
	checkDeviceInDbAutoD();
}
*/

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function disEnNewTestTDlgPObjs(opt){
	var objs = [$('#addNewTestTMmgmtIp'),$('#addNewTestTMmgmtIpPortChk'),
		$('#addNewTestTMmgmtIpPort'),$('#addNewTestTConIp'),
		$('#addNewTestTConIpPort'),$('#addNewTestTUserN'),$('#addNewTestTPassW'),
		$('#addNewTestTDomainOpt'),$('#addNewTestTOptValChk'),$('#addNewTestTIncPartPChk'),
		$('#addNewTestTMapPartPChk')];

	$.each(objs, function(index,object){
		if(opt=="disable"){
			object.attr("disabled","disabled");
		}else if(object==$('#addNewTestTMmgmtIpPort') || object==$('#addNewTestTConIpPort')){
			object.val("");
		}else{
			object.removeAttr("disabled");
		}
	});
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function hideShowTestToolPartner(opt){
	var objs = [$('#autoDTestTPartInfo1'),$('#autoDTestTPartInfo2'),
		$('#autoDTestTPartnerInfoTableCont'),$('#autoDTestTPortSrch'),
		$('#autoDTestTOptIncMappChk'),$('#autoDTestTPartPortsSrchLblCont'),
		$('#autoDTestTSlotsIncCont'),$('#autoDTestTSlotInfoTableCont')];
	$.each(objs, function(index,object){
		if(opt=="hide"){
			object.hide();
		}else{
			object.show();
		}
	});
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
function resetautoDTestTPartInfo(excl) {
	$('#autoDTestTPartInfo1').hide();
	$('#autoDTestTPartInfo2').hide();
	$('#autoDTestTPartnerInfoTableCont').hide();
	$('#autoDTestTOptIncMappChk').hide();
	$('#autoDTestTPartPortsSrchLblCont').hide();
	$('#autoDTestTSlotsIncCount').hide();
	$('#autoDTestTSlotInfoTableCont').hide();
}

/*
 *
 *  FUNCTION NAME : 
 *  AUTHOR        : Cathyrine C. Bobis
 *  DATE          : 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */
/*New Server*/
$(document).on("click", "#serverSubNew", function () {
	AutoDType = 'server';
	$("#serverMain").popup("close");
	newDevice("testtool");
	loadTestToolServerContent("server","manual");
});

$(document).on('click', '#toolsOptions', function() {
	$("#toolsOptions").addClass('animated pulse');
	setTimeout(function(){
    	$("#toolsOptions").removeClass('animated pulse');
        $("#barsPalette").hide();
        $("#viewTools").show();
	},1500);
});
/* Enable Disable popup start*/
$(document).on("click", "#enableDisablefilter", function () {
    $("#enableDisablefilter").addClass('animated pulse');
    setTimeout(function(){
        enableDisablePopupFilter();
    },1500);
});
function enableDisablePopupFilter() {
    $("#debugPopup").trigger("create");
    $("#debugheader").html("<center><h2>Filter</h2></center>");
    $.mobile.changePage( "#debugPopup", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
}
$(document).on("click", "#enableDisabletimepicker", function () {
    $("#enableDisabletimepicker").addClass('animated pulse');
    setTimeout(function(){
		$("#debugPopup").removeClass('animated pulse');
		$("#debugheader").html("<center><h2>Time Picker</h2></center>");
		$.mobile.changePage( "#debugPopup", {
        	transition: "pop",
        	changeHash: false
		});
        $("#enableDisable").show();
	},1500);
	$(document).on('click', '#okButton', function() {
		if ($("#radio-choice-1").is(':checked')){
      		TimePicker=true;
	    }else if ($("#radio-choice-2").is(':checked')){
    	    TimePicker=false;
	    }
	});
});

$(document).on('click', '#DeviceLogs', function(){
	//console.log("clickDeviceLogs");
	deviceMenuPopup();
	showDeviceLogs();
});
$(document).on('click', '#linkLogsList', function(){
	deviceMenuPopup();
    showLinkLogs();
});
$(document).on('click', '#ConnectivityLogs', function(){
	//console.log("clickConnectivityLogs");
	deviceMenuPopup();
	showConnectivityLogs();
});
$(document).on('click', '#LinkSanityLogs', function(){
	//console.log("clickLinkSanityLogs");
	deviceMenuPopup();
	showLinkSanityLogs();
});/*
	$(document).on('click', '.showlogs', function(){
		deviceMenuPopup();console.log("PopPop")
		var title = $(this).attr("title");
		$("#headerlogs").empty().append(title)
	});*/
function enableDisablePopupTimePicFunc() {
    $("#debugPopup").trigger("create");
    $("#debugheader").html("<center><h2>Time Picker</h2></center>");
    $.mobile.changePage( "#debugPopup", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
}
/* Enable Disable popup end */
/*  */
$(document).on('click', '#showActivity', function() {
    $("#showActivity").addClass('animated pulse');
    setTimeout(function(){
        $("#showActivity").removeClass('animated pulse');
        $("#viewTools").hide();
        $("#showActivityPopUp").show();
    },1500);
});
$(document).on("click", "#enableDisablefilterview", function () {
    $("#enableDisablefilterview").addClass('animated pulse');
    setTimeout(function(){
        $("#viewOptions").removeClass('animated pulse');
        $("#debugheader").html("<center><h2>Filter</h2></center>");
        $.mobile.changePage( "#debugPopup", {
            transition: "pop",
            changeHash: false
        });
        $("#enableDisable").show();
    },1500);
    $(document).on('click', '#okButton', function() {
        if ($("#radio-choice-1").is(':checked')){
            Filter=true;
        }else if ($("#radio-choice-2").is(':checked')){
            Filter=false;
        }
    });
});
function deviceConfigStat() {
	$(document).on('pagebeforeshow', '#DeviceConfigStatus', function (e, ui) {
		$('#DeviceConfigStatus div[role="dialog"]').css({"max-width":"1200px"});
	});
	if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "false"){
		$('#liDevSan').hide();	
	}
	if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "false"){
		$('#liAccSan').hide();	
	}
	if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "false"){
		$('#liConn').hide();	
	}
	if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "false"){
		$('#liEnaInt').hide();	
	}
	if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "false"){
		$('#liLinkSan').hide();	
	}
	if(StartReservation.toString() == "false"){
		$('#liLoadImg').hide();
		$('#liLoadConf').hide();
	}else{
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "false" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == ""){
			$('#liLoadImg').hide();
		}
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "false" || globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == ""){
			$('#liLoadConf').hide();
		}
	}
	if($('#comOpDevSanity').is(':checked') == false && $('#comOpAccSanity').is(':checked') == false && Connectivity == "false" && $('#comOpEnaInterface').is(':checked') == false && $('#comOpLinkSanity').is(':checked') == false){
		error("Please select one to run the sanity","Notification");
//		$("#OkPopUpHeader").html("<center><h4>Notification</h4></center>");
//		$("#OkPopUpInfo").html("Please select one to run the sanity");
//		okPopupFunc();	
		return	
	}
	
    $.mobile.changePage( "#DeviceConfigStatus", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
	$('#ulDevConf li').removeAttr('class');
	checkFromSanity = "true";	
	$('#santabs').tabs();
	if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].DeviceSanity.toString() == "true"){
		devSanInit();
		$('#liDevSan a').trigger('click');
//		sanityQuery('deviceSanity');
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].AccessSanity.toString() == "true"){
		accSanInit();
		$('#liAccSan a').trigger('click');			
//			sanityQuery('accessSanity');
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].Connectivity.toString() == "true"){
		connSanInit();
		$('#liConn a').trigger('click');
//			sanityQuery('connectivitiy');
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LinkSanityEnable.toString() == "true"){
		linkSanInit();
		$('#liLinkSan a').trigger('click');
//			sanityQuery('linksanity');
	}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].EnableInterface.toString() == "true"){
		 enableIntInit();
		 $('#liLinkSan a').trigger('click');
//			sanityQuery('enableint');
	}else if(StartReservation.toString() == "true"){
		if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadImageEnable.toString() == "true"){
			loadImgInit();
			$('#liLoadImg a').trigger('click');
//				sanityQuery('loadConfig');			
		}else if(globalMAINCONFIG[pageCanvas].MAINCONFIG[0].LoadConfigEnable.toString() == "true"){
			loadConfInit();
			$('#liLoadConf a').trigger('click');
//				sanityQuery('loadConfig');
		}
	}
}

$(function() {
    $( "#tabs" ).tabs();
	$('#tabsDevlist').tabs();
   	$( "#tabsDevices" ).tabs();
   	$( "#tabsDevInfo" ).tabs();
});
/*$(function() {
    $( "#EORtabs" ).tabs();
});*/
/*$(document).on("click", "#showlinksanity", function () {
    $("#showlinksanity").addClass('animated pulse');
    setTimeout(function(){
        showactivelinksanity();
    },1500);
});
function showactivelinksanity() {
	$(document).on('pagebeforeshow', '#LinkSanity', function (e, ui) {
		$('#LinkSanity div[role="dialog"]').css({"max-width":"1200px"});
	});
	 $.mobile.changePage( "#LinkSanity", {
      transition: "pop",
      //reverse: false,
      changeHash: false
    });
}*/
/*
$(document).on("click", "#endOfReservation", function () {
    $("#endOfReservation").addClass('animated pulse');
    setTimeout(function(){
        showendOfReservation();
    },1500);
});
function showendOfReservation() {
    $(document).on('pagebeforeshow', '#EORPopUP', function (e, ui) {
        $('#EORPopUP div[role="dialog"]').css({"max-width":"1000px"});
    });
     $.mobile.changePage( "#EORPopUP", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
}*/
/*$(document).on("click", "#startOfReservation", function () {
    $("#startOfReservation").addClass('animated pulse');
    setTimeout(function(){
        startOfReservationPopup();
    },1500);
});
function startOfReservationPopup() {
    $(document).on('pagebeforeshow', '#StartOfReservation', function (e, ui) {
        $('#StartOfReservation div[role="dialog"]').css({"max-width":"1200px"});
    });
     $.mobile.changePage( "#StartOfReservation", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
}*/
/*$(document).on("click", "#activeDevSanity", function () {
    $("#activeDevSanity").addClass('animated pulse');
    setTimeout(function(){
		var str = sanityQuery('deviceSanity');
		console.log(str);
        activeDevpop();
    },1500);
});
function activeDevpop() {
    $(document).on('pagebeforeshow', '#activedeviceConfigpopup', function (e, ui) {
        $('#activedeviceConfigpopup div[role="dialog"]').css({"max-width":"1200px"});
    });
     $.mobile.changePage( "#activedeviceConfigpopup", {
      transition: "flow",
      reverse: false,
      changeHash: true
    });
}*/


var gstrLeft = "";
var gstrCenter ="";
var gstrRight ="";
$(document).on("change", "#selectLeftType", function () {
	gstrLeft = "";
    gstrCenter ="";

	var type = $("#selectLeftType").val();
	for (var a=0; a<managePortArr.length; a++){
		if (managePortArr[a].Position == "left" && type == "all"){
        	gstrCenter +="<li>&#8594; &#x2192;</li>";
    		gstrLeft += "<li data-name='"+managePortArr[a].ObjectPath+"' portType='"+managePortArr[a].PortType+"'> <a href='#'>"+managePortArr[a].PortType+"-"+managePortArr[a].PortName+"("+managePortArr[a].Description+")</a></li>";
		}else if (managePortArr[a].Position == "left" && managePortArr[a].PortType == type){
        	gstrCenter +="<li>&#8594; &#x2192;</li>";
    		gstrLeft += "<li data-name='"+managePortArr[a].ObjectPath+"' portType='"+managePortArr[a].PortType+"'> <a href='#'>"+managePortArr[a].PortType+"-"+managePortArr[a].PortName+"("+managePortArr[a].Description+")</a></li>";
		}
	}	
	$('#deviceCenter').empty().append(gstrCenter);
    $('#deviceCenter').listview('refresh');
    $('#deviceLeft').empty().append(gstrLeft);
    $('#deviceLeft').listview('refresh');
	dragAndHighlight();
});
$(document).on("change", "#selectRightType", function () {
	gstrRight = "";

	var type = $("#selectRightType").val();
	for (var a=0; a<managePortArr.length; a++){
		if (managePortArr[a].Position == "right" && type== "all"){
			gstrRight+= "<li data-name='"+managePortArr[a].ObjectPath+"'portType='"+managePortArr[a].PortType+"' >"+managePortArr[a].PortType+"-"+managePortArr[a].PortName+"("+managePortArr[a].Description+")</li>";
		} else if (managePortArr[a].Position == "right" && managePortArr[a].PortType == type){
			gstrRight+= "<li data-name='"+managePortArr[a].ObjectPath+"'portType='"+managePortArr[a].PortType+"' >"+managePortArr[a].PortType+"-"+managePortArr[a].PortName+"("+managePortArr[a].Description+")</li>";
		}
	}	

	$('#deviceCenter').empty().append(gstrCenter);
    $('#deviceCenter').listview('refresh');
    $('#deviceLeft').empty().append(gstrLeft);
    $('#deviceLeft').listview('refresh');
	$('#deviceRight').empty().append(gstrRight);
    $('#deviceRight').listview('refresh');
	dragAndHighlight();
});

$( document ).on( "pageinit", "#lineTableDiv", function( event ) {
	$(document).on('click', '#doneManageConnectivity', function(){
		manageConnectivity();
	});
});

$( document ).on( "pageinit", "#manageConnectionDiv", function( event ) {
	$(document).on('click', '#okLine', function(){
		linekOk();
	});
});


/* Administration - User pageinit */
$( document ).on( "pageinit", "#UserPage", function( event ) {
	initDialog();
	$(document).on('click', '#addUser', function(){
		setTimeout(function(){
           	$.mobile.changePage("addEditUserPopUp.html",{
               	transition: "pop",
				reverse: true,
		    	changeHash: true
            });
			
       	},1500);
		globalAdminFunc = 'add';
	});
	
	
	$(document).on('click','#editUser', function(){
		setTimeout(function(){
           	$.mobile.changePage("addEditUserPopUp.html",{
               	transition: "pop",
				reverse: true,
		    	changeHash: true
            });
			
       	},1500);
		globalAdminFunc = 'edit';
		
	});

	$(document).on('click','#deleteUser', function(){
//		$('#userAlert').popup('create');
		checkDeleteUser();
	});
	$(document).on('click','#showMore', function(){
		getpageLimit();
	});
	
});

/* Administration - add Edit User Pop Up pageinit */
$( document ).on( "pageinit", "#addUserPopUp", function( event ) {
	setTimeout(function(){
		ddEditUserInit();
	},3000);
	
	$(document).on('click', '#cancelAdd', function(){
		setTimeout(function(){
	    	$.mobile.changePage( "AdminUser.html", {
	    	  transition: "pop",
		      reverse: true,
	    	  changeHash: true
		    });
			loadUserTable();	
		},1500);
	});
	$(document).on('click', '#saveUser', function(){
		saveAddUser();
	});
	
});

/* Administration - Group pageinit */
$(document).on( "pageinit", "#GroupPage", function( event ) {
	initDialog();
	$(document).on('click', '#addGroup', function(){
		setTimeout(function(){
           	$.mobile.changePage("addEditGroupPopUp.html",{
               	transition: "pop",
				reverse: true,
		    	changeHash: true
            });
			
       	},1500);
		globalAdminFunc = 'add';
	});
	
	
	$(document).on('click','#editGroup', function(){
		setTimeout(function(){
           	$.mobile.changePage("addEditGroupPopUp.html",{
               	transition: "pop",
				reverse: true,
		    	changeHash: true
            });
			
       	},1500);
		globalAdminFunc = 'edit';
		
	});

	$(document).on('click','#deleteGroups', function(){
	});
	$(document).on('click','#showMore', function(){
		getpageLimit();
	});
});

/* Administration - Add Edit Groups Pop Up pageinit */
$(document).on( "pageinit", "#addEditGroupPopUp", function( event ) {
});

/* Administration - Domain pageinit */
$(document).on( "pageinit", "#DomainPage", function( event ) {
});

/* Administration - Access Rights pageinit */
$(document).on( "pageinit", "#AccRightsPage", function( event ) {
	initDialog();
	$(document).on('click','#addAccRights', function(){
		setTimeout(function(){
	    	$.mobile.changePage( "addEditAccRightsPopUp.html", {
	    	  transition: "pop",
		      reverse: true,
	    	  changeHash: true
		    });
		},1500);
		globalAdminFunc = "add";
	});
	$(document).on('click','#editAccRights', function(){
		setTimeout(function(){
	    	$.mobile.changePage( "addEditAccRightsPopUp.html", {
	    	  transition: "pop",
		      reverse: true,
	    	  changeHash: true
		    });
		},1500);
		globalAdminFunc = "edit";
	});
	$(document).on('click','#deleteAccRights', function(){
		globalAdminFunc = "delete";
		deleteAccRi();
	});
	
});

/* Administration - Add Edit Access Rights Pop Up pageinit */
$( document ).on( "pageinit", "#AccRightsPopUp", function( event ) {
	if (globalAdminFunc == 'add'){
		
	}else if (globalAdminFunc == 'edit'){
		loadAccRiData();
	}
	$(document).on('click','#addEditAccRi', function(){
		saveAccessRights();
	});
	$(document).on('click','#cancelAccRi', function(){
		closeAccRi();				
	});
	$(document).on('click','#showMore', function(){
		getpageLimit();
	});
	$( ".inputDesign" ).textinput({ wrapperClass: "input-design" });
	accRiCheckBoxes();
});

function closeAccRi(){
	setTimeout(function(){
	    $.mobile.changePage( "AdminAccRights.html", {
	    	transition: "flow",
    		reverse: true,
     		changeHash: true
    	});
		loadAccRightsTable();
	},1500);
}

function userTextInputs(){
	$(document).on('change','#addtxtCountry', function(){
		changeContactFormat('addtxtCountry');
	});
	$(document).on('blur','#addtxtFirstName', function(){
		validateFirstName('addtxtFirstName');
	});
	$(document).on('blur','#addtxtMiddleName', function(){
		validateMiddleName('addtxtMiddleName');
	});
	$(document).on('blur','#addtxtLastName', function(){
		validateLastName('addtxtLastName');
	});
	$(document).on('blur','#addtxtHomePhoneNo', function(){
		validateHomePhoneNo('addtxtHomePhoneNo');
	});
	$(document).on('blur','#addtxtHomeAdd', function(){
		validateHomeAdd('addtxtHomeAdd');
	});
	$(document).on('blur','#addtxtHomePhoneNo', function(){
		validateHomePhoneNo('addtxtHomePhoneNo');
	});
	$(document).on('blur','#addtxtMobileNo', function(){
		validateMobileNo('addtxtMobileNo');
	});
	$(document).on('blur','#addtxtPhoneNo', function(){
		validatePhoneNo('addtxtPhoneNo');
	});
	$(document).on('blur','#addtxtEmail', function(){
		validateEmail('addtxtEmail');
	});
	$(document).on('blur','#addtxtEmployNo', function(){
		validateEmployNo('addtxtEmployNo');
	});
	$(document).on('blur','#addtxtOfficeAdd', function(){
		validateOfficeAdd('addtxtOfficeAdd');
	});
	$(document).on('blur','#addtxtDivision', function(){
		validateDivision('addtxtDivision');
	});
	$(document).on('blur','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
	$(document).on('keyup','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
	$(document).on('keypress','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
	$(document).on('keydown','#addtxtUserName', function(){
		validateUserName('addtxtUserName');
	});
}

function accRiCheckBoxes(){
	$(document).on('click','#CECbox', function(){
		var val = $(this).val();
		showAccess("CEChoices",val);
	});
	$(document).on('click','#RMCbox', function(){
		var val = $(this).val();
		showAccess("RMChoices",val);
	});
	$(document).on('click','#ADCbox', function(){
		var val = $(this).val();
		showAccess("ADChoices",val);
	});
	$(document).on('click','#PMCbox2', function(){
		var val = $(this).val();
		showAccess("PMChoices",val);
	});
	$(document).on('click','#SRCbox', function(){
		var val = $(this).val();
		showAccess("SRChoices",val);
	});
	
}

/*kmmabignay mar7- action handler for Menu >> Tools >> Configuration*/
function newpopupBasicHandler(){
	$("#newpopupBasic").addClass('animated pulse');
	var parentDiv = document.getElementById("barsPanel");
	/*---------create tableitems----------*/
	var trItems = document.createElement('tr');
	trItems.id = "toolsConfTrayItems";
	var key = "toolsConf";
	var tabStr1 = xtdStr(key+"Save","img/bars/save.png","Save");
	var tabStr2 = xtdStr(key+"SaveRes","img/bars/result.png","Save Results");
	var tabStr3 = xtdStr(key+"Load","img/bars/load.png","Load");
	var tabStr4 = xtdStr(key+"LoadRes","img/bars/result.png","Load Results");
	$(trItems).empty().append(tabStr1,tabStr2,tabStr3,tabStr4);
	/*----pass args to createDynmicTray---*/
	createDynmicTray("bck2ToolsMenu",parentDiv,trItems,"toolsConfTray","4","Configuration");
	setTimeout(function(){
		$("#newpopupBasic").removeClass('animated pulse');
		$("#viewTools").hide();
		$("#toolsConfTray").show();
	},1500);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar7 - create palette dynamically*/
function createDynmicTray(back,parentDiv,tableItems,tableId,trNum,title){
	var newTable = document.createElement('table');
	newTable.id = tableId;
	newTable.setAttribute("style","display:none\;min-width: 390px\;");
	newTable.setAttribute("data-theme","c");
	var trStyle = document.createElement('tr');
	trStyle.setAttribute("style","height: 40px\;");
	var tdCol = document.createElement('td');
	tdCol.setAttribute("colspan",trNum);
	var aChild = document.createElement('a');
	aChild.href= "#";
	aChild.setAttribute("data-role","button");
	aChild.setAttribute("data-icon","back");
	aChild.setAttribute("data-iconpos","notext");
	aChild.setAttribute("data-theme","d");
	aChild.setAttribute("data-mini","true");
	var styleVal = "margin-top: -20px\; z-index: 999\; ";
	styleVal += "position: absolute\;";
	aChild.setAttribute("style",styleVal);
	var uilist = back+" ui-link ui-btn ui-btn-d ui-icon-back ";
	uilist += "ui-btn-icon-notext ui-shadow ui-corner-all ui-mini";
	aChild.setAttribute("class",uilist);
	aChild.setAttribute("role","button");
	var divStyle = document.createElement('div');
	divStyle.id = "PaletteTitle";
	divStyle.setAttribute("style","margin: -20px 0px 1px 0px;"); 
	divStyle.setAttribute("data-role","banner");
	divStyle.setAttribute("data-theme","d"); 
	divStyle.setAttribute("data-add-back-btn","false");
	divStyle.setAttribute("class","PaletteTitle ui-header ui-bar-d");
	var textInsert = document.createTextNode(title);
	var tbody =  document.createElement('tbody');
	divStyle.appendChild(textInsert);
	tdCol.appendChild(aChild);
	tdCol.appendChild(divStyle);
	trStyle.appendChild(tdCol);
	tbody.appendChild(trStyle);
	tbody.appendChild(tableItems);
	newTable.appendChild(tbody);
	parentDiv.appendChild(newTable);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar7 - tools >> configuration onclick actionHandler*/
function onClickAction(key,popup2Close){	
	switch(key){
		case "toolsConfigOpt":
			/*mainMenu >> tools >> configuration*/
			var toEval = "toolsConfPages";
			var toEval2 = "toolsShowActPages";
			docEventHandler("toolsConfSave",popup2Close,toEval);
			docEventHandler("toolsConfSaveRes",popup2Close,toEval2);
			docEventHandler("toolsConfLoad",popup2Close,toEval);
			docEventHandler("toolsConfLoadRes",popup2Close,toEval2);
			break;
		case "toolsSoftOpt":
			/*mainMenu >> tools >> software*/
			var toEval = "toolsConfPages";
			var toEval2 = "toolsShowActPages";
			docEventHandler("toolsSoftSave",popup2Close,toEval);
			docEventHandler("toolsSoftSaveRes",popup2Close,toEval2);
			docEventHandler("toolsSoftLoad",popup2Close,toEval);
			docEventHandler("toolsSoftLoadRes",popup2Close,toEval2);
			break;
		case "toolsShowActOpt":
			/*mainMenu >> tools >> showActivity*/
			var toEval = "toolsShowActPages";
//			docEventHandler("showActAutoD",popup2Close,"showActiveAutoDLog();");
			docEventHandler("activeDevSanity",popup2Close,toEval);
			docEventHandler("showActConn",popup2Close,toEval);
			docEventHandler("showActEnaInt",popup2Close,toEval);
			docEventHandler("showActLinkSan",popup2Close,toEval);
			docEventHandler("showActAccessSan",popup2Close,toEval);
			docEventHandler("endOfReservation",popup2Close,toEval);
			docEventHandler("startOfReservation",popup2Close,toEval);
			break;
		case "devToolsOpt":
			/*devMenu >> Tools*/
			docEventHandler("devToolsConf","","devToolsConfClick");
			docEventHandler("devToolsSoft","","devToolsSoftClick");
			docEventHandler("devToolsLinkSan","","devToolsLinkSanClick");
			break;
		case "devToolsConfOpt":
			/*devMenu >> Tools >> configuration*/
			var toEval = "toolsConfPages";
			var toEval2 = "toolsShowActPages";
			docEventHandler("devToolsConfSave",popup2Close,toEval);
			docEventHandler("devToolsConfSaveRes",popup2Close,toEval2);
			docEventHandler("devToolsConfLoad",popup2Close,toEval);
			docEventHandler("devToolsConfLoadRes",popup2Close,toEval2);
			break;
		case "devToolsSoftOpt":
			/*devMenu >> Tools >> software*/
			var toEval = "toolsConfPages";
			var toEval2 = "toolsShowActPages";
			docEventHandler("devToolsSoftSave",popup2Close,toEval);
			docEventHandler("devToolsSoftSaveRes",popup2Close,toEval2);
			docEventHandler("devToolsSoftLoad",popup2Close,toEval);
			docEventHandler("devToolsSoftLoadRes",popup2Close,toEval2);
			break;
		case "toolsLinkSanOpt":
			/*mainMenu >> Tools >> linkSanity Options*/
			docEventHandler("toolsLinkSanRun",popup2Close,"linkSanRunValid");
			docEventHandler("toolsLinkSanRes",popup2Close,"toolsShowActPages");
			break;
		case "devToolsLinkSanOpt":
			/*devMenu >> Tools >> linkSanity Options*/
			docEventHandler("devToolsLinkSanRun",popup2Close,"linkSanRunValid");
			docEventHandler("devToolsLinkSanRes",popup2Close,"toolsShowActPages");
			break;
	}
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar10 - document onclick  eventHandler*/
function docEventHandler(key,popup2Close,pages){
	$('#'+key).unbind('click');
	$(document).on("click", "#"+key, function(){
		if(popup2Close!=""){
			$("#"+popup2Close).popup("close");
		}
		setTimeout(function(){
			var argStr = "(\""+key+"\")";
			eval(pages+argStr);
		},300);
	});
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar7 - onclick action subFunction*/
function toolsConfPages(key){
	if(document.getElementById("startEndReserve")!=null){
		$("#startEndReserve").remove();
	}
	var title = ""; var w = "100%"; var h = "100%";
	$("#"+key).addClass('animated pulse');
	var seRes = "<div id=\"startEndReserve\" style=\"width:100%\; ";
	seRes += "display:none\"></div>";
	$("#configEditorPage").append(seRes);
	switch(key){
		case "toolsConfSave": 
			HostName = "";
		case "devToolsConfSave":
			checkDeviceStatus('end','saveCon'); 
			title = "Save Configuration";
			break;
		case "toolsConfSaveRes": 
			HostName = "";
		case "devToolsConfSaveRes":
			resultConfigSoftware('saveConfig'); 
			title = "Save Configuration Result";
			break;
		case "toolsConfLoad": 
			HostName = "";
		case "devToolsConfLoad":
			checkDeviceStatus('start', 'loadCon'); 
			title = "Load Configuration";
			break;
		case "toolsConfLoadRes": 
			HostName = "";
		case "devToolsConfLoadRes":
			resultConfigSoftware('loadConfig'); 
			title = "Load Configuration Result";
			break;
		case "toolsSoftSave": 
			HostName = "";
		case "devToolsSoftSave": 
			checkDeviceStatus('end','saveImg'); 
			title = "Save Image";
			break;
		case "toolsSoftSaveRes": 
			HostName = "";
		case "devToolsSoftSaveRes": 
			resultConfigSoftware('saveImage'); 
			title = "Save Image Result";
			break;
		case "toolsSoftLoad": 
			HostName = "";
		case "devToolsSoftLoad": 
			checkDeviceStatus('start', 'loadImg'); 
			title = "Load Image";
			break;
		case "toolsSoftLoadRes": 
			HostName = "";
		case "devToolsSoftLoadRes": 
			resultConfigSoftware('loadImage'); 
			title = "Load Image Result";
			break;
		case "toolsEndRes": 
			startEndCheckBut('end','');
			commitOptionsOk();
			$("#ReserveOptionSaveImageDiv").show();
			title = "End Reservation Option";
			break;
		case "toolsStartRes": 
			startEndCheckBut('start','');
			commitOptionsOk();
			$("#ReserveOptionLoadImageDiv").show();
			title = "Start Reservation Option";
			break;
	}
	setTimeout(function(){
		$("#"+key).removeClass('animated pulse');
		if(!$("#errorPrompt").is(":visible")){
			$("#startEndReserve").css({"top":"-3px","left":""});
			$("#startEndReserve").show();
			customizePage(title,"startEndReserve",w,h);
		}
	},1500);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar7 - reusable customPage*/
function customizePage(header,content,w,h){
    $.mobile.changePage($('#customPage'),{
		changeHash : true,
		transition: "pop"
	});
	$(document).on("pageshow","#customPage",function(event){
		setTimeout(function(){
			$('#customPage').attr("style","height:100%;color:black;");
		},350);
	});		
	$("#customPageContent").css({"height":h,"color":"black"});
	$('#customPageHeader').empty().append(header);
	$('#customPageContent').empty().append($("#"+content));
	setTimeout(function(){
		$($("#customPage").children()[0]).attr("style","max-width: "+w);
	},300);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar10 - onClickShowActivity subFunction*/
function toolsShowActPages(key){
	if(document.getElementById("configPopUp")!=null){
		$("#configPopUp").remove();
	}
	var title = ""; var w = "100%"; var h = "100%";
	$("#"+key).addClass('animated pulse');
	var seRes = "<div id=\"configPopUp\" style=\"width:100%\; ";
	seRes += "display:none\; z-index: 9999999\;\"></div>";
	$("#configEditorPage").append(seRes);
	switch(key){
		case "showActAutoD": 
			showPopup('autoD');
			title = "Auto Discovery";
			break;
		case "showActConn": 
			showPopup('conn');
			title = "Connectivity Information";
			break;
		case "showActEnaInt": 
			showPopup('enport');
			title = "EnableInterface Information";
			break;
		case "showActLinkSan": 
		case "toolsLinkSanRes": 
			HostName = "";
		case "devToolsLinkSanRes": 
			showPopup('linksan');
			title = "LinkSanity Information";
			break;
		case "showActAccessSan": 
			showPopup('access');
			title = "AccessSanity Information";
			break;
		case "endOfReservation": 
			showPopup('end');
			title = "Information";
			break;
		case "startOfReservation": 
			showPopup('start');
			title = "Information";
			break;
		case "activeDevSanity": 
			showPopup('devsan');
			title = "DeviceSanity Information";
			break;
		case "toolsPowerInfo": 
			showPower();
			title = "Power Information"; 
			break;
		case "toolsConfSaveRes": 
			HostName = "";
		case "devToolsConfSaveRes":
			resultConfigSoftware('saveConfig'); 
			title = "Save Configuration Result";
			break;
		case "toolsConfLoadRes": 
			HostName = "";
		case "devToolsConfLoadRes":
			resultConfigSoftware('loadConfig'); 
			title = "Load Configuration Result";
			break;
		case "toolsSoftSaveRes": 
			HostName = "";
		case "devToolsSoftSaveRes": 
			resultConfigSoftware('saveImage'); 
			title = "Save Image Result";
			break;
		case "toolsSoftLoadRes": 
			HostName = "";
		case "devToolsSoftLoadRes": 
			resultConfigSoftware('loadImage'); 
			title = "Load Image Result";
			break;
	}
	setTimeout(function(){
		$("#"+key).removeClass('animated pulse');
		if(!$("#errorPrompt").is(":visible")){
			$("#configPopUp").css({"top":"-3px"});
			$("#configPopUp").show();
			customizePage(title,"configPopUp",w,h);
		}
	},1500);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar10 - action handler for Menu >> Tools >> Software*/
function toolsSoftwarePopupHandler(){
	$("#toolsSoftwarePopup").addClass('animated pulse');
	var parentDiv = document.getElementById("barsPanel");
	/*---------create tableitems----------*/
	var trItems = document.createElement('tr');
	trItems.id = "toolsSoftTrayItems";
	var tabStr1 = xtdStr("toolsSoftSave","img/bars/save.png","Save");
	var tabStr2 = xtdStr("toolsSoftSaveRes","img/bars/result.png","Save Results");
	var tabStr3 = xtdStr("toolsSoftLoad","img/bars/load.png","Load");
	var tabStr4 = xtdStr("toolsSoftLoadRes","img/bars/result.png","Load Results");
	$(trItems).empty().append(tabStr1,tabStr2,tabStr3,tabStr4);
	/*----pass args to createDynmicTray---*/
	createDynmicTray("bck2ToolsMenu",parentDiv,trItems,"toolsSoftTray","4","Software");
	setTimeout(function(){
		$("#toolsSoftwarePopup").removeClass('animated pulse');
		$("#viewTools").hide();
		$("#toolsSoftTray").show();
	},1500);
}
/*-----------------------------------------------------------------*/

/*kmmabignay - mar11 >> create td string----*/
function xtdStr(keyId,imgPng,title,mini){
	var tabStr = ""; var imgW = "60px";
	if(mini){
		tabStr += "<td data-mini=\"true\"><img id=\""+keyId+"\" ";
		imgW = "45px";
	}else{
		tabStr += "<td><img id=\""+keyId+"\" ";
	}
	tabStr += "src=\""+imgPng+"\" ";
	tabStr += "style=\"width: "+imgW+"\;\" /><p>"+title+"</p></td>";
	return tabStr;
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar11 - action handler for devMenu >> Tools >> Software*/
function devToolsSoftClick(key){
	$("#"+key).addClass('animated pulse');
	var parentDiv = document.getElementById("deviceMenuPanel");
	/*---------create tableitems----------*/
	var trItems = document.createElement('tr');
	trItems.id = "devToolsSoftTrayItems";
	var tabStr1 = xtdStr(key+"Save","img/bars/save.png","Save","mini");
	var tabStr2 = xtdStr(key+"SaveRes","img/bars/result.png","Save Results","mini");
	var tabStr3 = xtdStr(key+"Load","img/bars/load.png","Load","mini");
	var tabStr4 = xtdStr(key+"LoadRes","img/bars/result.png","Load Results","mini");
	$(trItems).empty().append(tabStr1,tabStr2,tabStr3,tabStr4);
	/*----pass args to createDynmicTray---*/
	createDynmicTray("bckDeviceMenu",parentDiv,trItems,"devToolsSoftTray","4","Software");
	setTimeout(function(){
		$("#"+key).removeClass('animated pulse');
		$("#deviceToolsListSub").hide();
		$("#devToolsSoftTray").show();
	},1500);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar11 - action handler for devMenu >> Tools >> Config*/
function devToolsConfClick(key){
	$("#"+key).addClass('animated pulse');
	var parentDiv = document.getElementById("deviceMenuPanel");
	/*---------create tableitems----------*/
	var trItems = document.createElement('tr');
	trItems.id = "devToolsConfTrayItems";
	var tabStr1 = xtdStr(key+"Save","img/bars/save.png","Save","mini");
	var tabStr2 = xtdStr(key+"SaveRes","img/bars/result.png","Save Results","mini");
	var tabStr3 = xtdStr(key+"Load","img/bars/load.png","Load","mini");
	var tabStr4 = xtdStr(key+"LoadRes","img/bars/result.png","Load Results","mini");
	$(trItems).empty().append(tabStr1,tabStr2,tabStr3,tabStr4);
	/*----pass args to createDynmicTray---*/
	createDynmicTray("bckDeviceMenu",parentDiv,trItems,"devToolsConfTray","4","Configuration");
	setTimeout(function(){
		$("#"+key).removeClass('animated pulse');
		$("#deviceToolsListSub").hide();
		$("#devToolsConfTray").show();
	},1500);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar12 - action handler for Menu >> Tools >> LinkSanity*/
function showlinksanityHandler(){
	$("#showlinksanity").addClass('animated pulse');
	var parentDiv = document.getElementById("barsPanel");
	/*---------create tableitems----------*/
	var trItems = document.createElement('tr');
	trItems.id = "toolsLinkSanTrayItems";
	var tabStr1 = xtdStr("toolsLinkSanRun","img/bars/run.png","Run");
	var tabStr2 = xtdStr("toolsLinkSanRes","img/bars/result.png","Results");
	$(trItems).empty().append(tabStr1,tabStr2);
	/*----pass args to createDynmicTray---*/
	createDynmicTray("bck2ToolsMenu",parentDiv,trItems,"toolsLinkSanTray","2","Link Sanity");
	setTimeout(function(){
		$("#showlinksanity").removeClass('animated pulse');
		$("#viewTools").hide();
		$("#toolsLinkSanTray").show();
	},1500);
}
/*-----------------------------------------------------------------*/

/*kmmabignay mar12 - action handler for devMenu >> Tools >> LinkSanity*/
function devToolsLinkSanClick(key){
	$("#"+key).addClass('animated pulse');
	var parentDiv = document.getElementById("deviceMenuPanel");
	/*---------create tableitems----------*/
	var trItems = document.createElement('tr');
	trItems.id = "devToolsLinkSanTrayItems";
	var tabStr1 = xtdStr(key+"Run","img/bars/run.png","Run","mini");
	var tabStr2 = xtdStr(key+"Res","img/bars/result.png","Results","mini");
	$(trItems).empty().append(tabStr1,tabStr2);
	/*----pass args to createDynmicTray---*/
	createDynmicTray("bckDeviceMenu",parentDiv,trItems,"devToolsLinkSanTray","2","Link Sanity");
	setTimeout(function(){
		$("#"+key).removeClass('animated pulse');
		$("#deviceToolsListSub").hide();
		$("#devToolsLinkSanTray").show();
	},1500);
}
/*-----------------------------------------------------------------*/

/*--kmmabignay - mar12 - showAutoDPopup-----*/
function showAutoDiscPage(fname,user,ip,pIp){
	setTimeout(function(){
    	$.mobile.changePage( "#autoDProcessDialog", {
        	transition: "pop",
	        changeHash: true
    	});
		showAutoDPopup(fname,user,ip,pIp);
		//setTimeout(function(){
		//},300);
	},350);

/*
	if(document.getElementById("autodContent")!=null){
		$("#autodContent").remove();
	}
	var title = "Auto Discovery"; var w = "100%"; var h = "100%";
	var content = "<div id=\"autodContent\" style=\"width:100%\; ";
	content += "display:none\"></div>";
	$("#configEditorPage").append(content);
*/
	/*---fetch data from cgi--------------------*/
//	showAutoDPopup(fname,user,ip,pIp);
	/*------------------------------------------*/
/*	setTimeout(function(){
		if(!$("#errorPrompt").is(":visible")){
			//$("#autodContent").css({"top":"-3px"});
			$("#autodContent").show();
			customizePage(title,"autodContent",w,h);
		}
	},1500);
*/
}
/*-----------------------------------------------------------------*/



