/****Script for comon function******/

/*
 * 
 *  FUNCTION NAME : autoResizeCanvas
 *  AUTHOR        : James Turingan
 *  DATE          : January 24, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : dynamic resizing the DIV or responsive 
 *  PARAMETERS    : 
 * 
 */

function autoResizeCanvas(){
	if(globalDeviceType != "Mobile"){
		$('#configContent'+pageCanvas).css({
			"height":height - 110,
			"width":width - 40,
			"margin": "0 auto",
			"margin-top": "7px",
			"margin-bottom": "25px",
			"margin-left": "25px",
			"z-index":"-10"
		});
		$('#main_container').css({
        	"height":height - 100,
	        "width":width - 25,
    	    "margin-left":"auto",
        	"margin-right":"auto"
	    });
	}
	$('#dockContainer').css({'left':'50%','position':'absolute','width':'auto'});
	$('.minicanvas').css({
		"height": gblCanvasHeight * 0.2,
		"width": gblCanvasWidth * 0.2
	});
	$('#scrFrameMini').css({
		"height": gblCanvasHeight * 0.2 + 40,
		"width": gblCanvasWidth * 0.2 + 17
	});
}

/*
 * 
 *  FUNCTION NAME : autoResizeDiv
 *  AUTHOR        : James Turingan
 *  DATE          : January 24, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : dynamic resizing the DIV or responsive 
 *  PARAMETERS    : 
 * 
 */
function autoResizeDiv(){
	if(globalDeviceType != "Mobile"){
//Canvas
//Tables
	$('.tableContent').css({
		"height":height - 120,
		"width":width - 215,
//		"margin": "0 auto",
		"margin-top": "20px",
		"position":"absolute",	
		"overflow":"auto",
		"margin-bottom": "15px",
		"margin-left": "170px"
	});
//Tree View
	$('.treeContent').css({
		"height":height - 120,
		"width":"151px",
		"margin-top": "20px",
		"overflow":"auto",
		"margin-bottom": "15px",
		"left": "15px",
		"position":"absolute"	
//		"margin-left": "175px",
	});
	var treeHeight = (height - 120) / 2;
	
	$(".triggerButton").css({
		"margin-top": treeHeight,
     	"left" :"172px" 
	})
	$('.triggerTreeMenu').css({
		"height":height - 120,
		"margin-top": "20px",
		"margin-bottom": "15px"
	});

//Side Panel
	$('#sideMenu').css({
		"height":height - 85,
		"width":"149px",
		"margin-top":"81px",
		"position":"absolute"
	});

	var sideBarHeight = (height - 70) / 2;
	$('#slideMenuTrigger').css({
		"margin-top": sideBarHeight,
		"margin-left":"2px"
	});
	$('#pageDiv').css({
		"position":"absolute",
		"bottom":"0px"
	});
	}
}
/*
 * 
 *  FUNCTION NAME : storeDeviceInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : store device information
 *  PARAMETERS    : devPath
 * 
 */


function storeDeviceInformation(devname,devtype,devpath,model,dndmodel,softver,osver,ostype,softpack,reeval,ipadd,devid,hostname,update,media,portname,mgntip,mgntip2,aux,disflag,exclusive,xpos,ypos,powerstats,power,tftpip,itftphost,tftpimgpath,tftpimgname,tftpuser,tftppass,itftpadd,tacacsip,tacacshost,radiusname,rdiusip,radius,radiuspass,desc,processor,processorboardid,manu,serialnum,ios,cpuspeed,sysmem,nvramcp,procmem,condone,reachdone,converdone,tftpserver,tuser,tpass,ftpserver,ftpuser,ftppass,configdetail,configfilepath,configfilename,configurl,saveconurl,configserver,configdest,imagefilepath,imagedetail,imagefilename,imageurl,saveimageurl,imageserver,iamgedest,saveimageen,saveconfigen,loadconfigen,loadimageen,saveimagedetail,saveimageserver,saveimagedest,saveimageuser,saveimagepass,saveimagetype,saveconfigdetail,saveconfigserver,saveconfigdest,saveconfiguser,saveconfigpass,saveconfigtype,saveconfigfilename,saveimagefilename,sysimagename,systemconname,savetypeimage,typeimage,savetypeconfig,typeconfig,chassispid,chassisvid,routename,totalmemory,totalmemory2,routename2,routeredundant,routedesc,routeprodid,routeprodid2,routeverid,rputeverid2,embedredundant,embedname,embedname2,embeddesc,embedproid,embedproid2,embedverid,embedverid2,embednitrox,embedocteon,embednotrox2,embedocteon2,linename,linedesc,lineproid,lineverid,linenum,modname,moddesc,modproid,modverid,profam,servertype,mgntint,mgntint2,mgntmask,mgntmask2,mgntipv6,mgntipv62,mgntipv5pref,mgntipv6pref2,protype,cpucore,prosock,corespersock,logpro,conip,titanname,profam,propid,connet,ipv6,key,admin,access,account,accountport,authendir,authenport,behost,configmethod,configname,configfile,configpath,cleartype,coaport,com,connectivity,dbname,dbtablename,dbtype,defaultsm,devlist,extip,enpass,features,func,logdir,nrcmd,nrcmduser,port,redirport,redirlogport,rootdir,serverdir,ventype,snapshot,domname,application,sequence,rp0con,rp1con,src,portarr, stats,conflag){
	if(update == "" || update ==undefined){
        update = "new";
    }
	if(globalInfoType == "JSON"){
		setDevicesInformationJSON(devname,devtype,devpath,model,dndmodel,softver,osver,ostype,softpack,reeval,ipadd,devid,hostname,update,media,portname,mgntip,mgntip2,aux,disflag,exclusive,xpos,ypos,powerstats,power,tftpip,itftphost,tftpimgpath,tftpimgname,tftpuser,tftppass,itftpadd,tacacsip,tacacshost,radiusname,rdiusip,radius,radiuspass,desc,processor,processorboardid,manu,serialnum,ios,cpuspeed,sysmem,nvramcp,procmem,condone,reachdone,converdone,tftpserver,tuser,tpass,ftpserver,ftpuser,ftppass,configdetail,configfilepath,configfilename,configurl,saveconurl,configserver,configdest,imagefilepath,imagedetail,imagefilename,imageurl,saveimageurl,imageserver,iamgedest,saveimageen,saveconfigen,loadconfigen,loadimageen,saveimagedetail,saveimageserver,saveimagedest,saveimageuser,saveimagepass,saveimagetype,saveconfigdetail,saveconfigserver,saveconfigdest,saveconfiguser,saveconfigpass,saveconfigtype,saveconfigfilename,saveimagefilename,sysimagename,systemconname,savetypeimage,typeimage,savetypeconfig,typeconfig,chassispid,chassisvid,routename,totalmemory,totalmemory2,routename2,routeredundant,routedesc,routeprodid,routeprodid2,routeverid,rputeverid2,embedredundant,embedname,embedname2,embeddesc,embedproid,embedproid2,embedverid,embedverid2,embednitrox,embedocteon,embednotrox2,embedocteon2,linename,linedesc,lineproid,lineverid,linenum,modname,moddesc,modproid,modverid,profam,servertype,mgntint,mgntint2,mgntmask,mgntmask2,mgntipv6,mgntipv62,mgntipv5pref,mgntipv6pref2,protype,cpucore,prosock,corespersock,logpro,conip,titanname,profam,propid,connet,ipv6,key,admin,access,account,accountport,authendir,authenport,behost,configmethod,configname,configfile,configpath,cleartype,coaport,com,connectivity,dbname,dbtablename,dbtype,defaultsm,devlist,extip,enpass,features,func,logdir,nrcmd,nrcmduser,port,redirport,redirlogport,rootdir,serverdir,ventype,snapshot,domname,application,sequence,rp0con,rp1con,src,portarr, stats,conflag);
		return;
	}
    devicesArr.push({
		DeviceName:devname,
		DeviceType:devtype,
		ObjectPath:devpath,
		Model:model,
		DNDModelType:dndmodel,
		SoftwareVersion:softver,
		OSVersion:osver,
		OSType:ostype,
		SoftwarePackage:softpack,
		ReEvaluate:reeval,
		IpAddress:ipadd,
		DeviceId:devid,
		HostName:hostname,	
		UpdateFlag:update,
		MediaType:media,
		Portname:portname,
		ManagementIp:mgntip,
		ManagementIp2:mgntip2,
		Auxiliary:aux,
		DiscoveryFlag:disflag,
		Exclusivity:exclusive,
		XLocation:xpos,
		YLocation:ypos,
		PowerStatus:powerstats,
		Power:power,
		TftpIpAddress:tftpip,
		TftpHostname:itftphost,
		TftpImagePath:tftpimgpath,
		TftpImageName:tftpimgname,
		TftpUser:tftpuser,
		TftpPassword:tftppass,
		TftpAddress:itftpadd,
		TacacsIpAddress:tacacsip,
		TacacsHostname:tacacshost,
		RadiusHostname:radiusname,
		RadiusIpAddress:rdiusip,
		RadiusUsername:radius,
		RadiusPassword:radiuspass,
		Description:desc,
		Processor:processor,
		ProcessorBoardId:processorboardid,
		Manufacturer:manu,
		SerialNumber:serialnum,
		IOS:ios,
		CPUSpeed:cpuspeed,
		SystemMemory:sysmem,
		NVRAMCF:nvramcp,
		ProcessorMemory:procmem,
		ConnectivityDone:condone,
		ReachabilityDone:reachdone,
		ConvergenceDone:converdone,
		TFTPServer:tftpserver,
		TFTPUser:tuser,
		TFTPPassword:tpass,
		FTPServer:ftpserver,
		FTPUser:ftpuser,
		FTPPassword:ftppass,
		ConfigDetail:configdetail,
		ConfigFilePath:configfilepath,
		ConfigFileName:configfilename,
		ConfigUrl:configurl,
		SaveConfigUrl:saveconurl,
		ConfigServer:configserver,
		ConfigDestination:configdest,
		ImageFilePath:imagefilepath,
		ImageDetail:imagedetail,
		ImageFileName:imagefilename,
		ImageUrl:imageurl,
		SaveImageUrl:saveimageurl,
		ImageServer:imageserver,
		ImageDestination:iamgedest,
		SaveImageEnable:saveimageen,
		SaveConfigEnable:saveconfigen,
		LoadConfigEnable:loadconfigen,
		LoadImageEnable:loadimageen,
		SaveImageDetail:saveimagedetail,
		SaveImageServer:saveimageserver,
		SaveImageDestination:saveimagedest,
		SaveImageUser:saveimageuser,
		SaveImagePassword:saveimagepass,
		SaveImageType:saveimagetype,
		SaveConfigDetail:saveconfigdetail,
		SaveConfigServer:saveconfigserver,
		SaveConfigDestination:saveconfigdest,
		SaveConfigUser:saveconfiguser,
		SaveConfigPassword:saveconfigpass,
		SaveConfigType:saveconfigtype,
		SaveConfigFileName:saveconfigfilename,
		SaveImageFileName:saveimagefilename,
		SystemImageName:sysimagename,
		SystemConfigName:systemconname,
		SaveTypeImage:savetypeimage,
		TypeImage:typeimage,
		SaveTypeConfig:savetypeconfig,
		TypeConfig:typeconfig,
		ChassisPid:chassispid,
		ChassisVid:chassisvid,
		RouteProcessorName:routename,
		TotalMemory:totalmemory,
		TotalMemory2:totalmemory2,
		RouteProcessorName2:routename2,
		RouteRedundant:routeredundant,
		RouteProcessorDescription:routedesc,
		RouteProcessorProductId:routeprodid,
		RouteProcessorProductId2:routeprodid2,
		RouteProcessorVersionId:routeverid,
		RouteProcessorVersionId2:rputeverid2,
		RP0ConsoleIp: rp0con,
		RP1ConsoleIp: rp1con,
		EmbeddedRedundant:embedredundant,
		EmbeddedProcessorName:embedname,
		EmbeddedProcessorName2:embedname2,
		EmbeddedProcessorDescription:embeddesc,
		EmbeddedProcessorProductId:embedproid,
		EmbeddedProcessorProductId2:embedproid2,
		EmbeddedProcessorVersionId:embedverid,
		EmbeddedProcessorVersionId2:embedverid2,
		EmbeddedProcessorNitrox:embednitrox,
		EmbeddedProcessorOcteon:embedocteon,
		EmbeddedProcessorNitrox2:embednotrox2,
		EmbeddedProcessorOcteon2:embedocteon2,
		LineCardName:linename,
		LineCardDescription:linedesc,
		LineCardProductId:lineproid,
		LineCardVersionId:lineverid,
		LineCardNumber:linenum,
		ModuleName:modname,
		ModuleDescription:moddesc,
		ModuleProductId:modproid,
		ModuleVersionId:modverid,
		ProductFamily:profam,
		ServerType:servertype,
		ManagementInterface:mgntint,
		ManagementInterface2:mgntint2,
		ManagementIpMask:mgntmask,
		ManagementIpMask2:mgntmask2,
		ManagementIpv6:mgntipv6,
		ManagementIpv62:mgntipv62,
		ManagementIpv6Prefix:mgntipv5pref,
		ManagementIpv6Prefix2:mgntipv6pref2,
		ProcessorType:protype,
		CPUCores:cpucore,
		ProcessorSockets:prosock,
		CoresPerSocket:corespersock,
		LogicalProcessor:logpro,
		ConsoleIp:conip,
		TitanName:titanname,
		ProcessorFamily:profam,
		ProcessorPId:propid,
		ConsoleNet:connet,
		Ipv6:ipv6,
		Key:key,
		Admin:admin,
		Access:access,
		Account:account,
		AccountPort:accountport,
		AuthenticationDirectory:authendir,
		AuthenticationPort:authenport,
		BEHostlist:behost,
		ConfigMethod:configmethod,
		ConfigName:configname,
		ConfigFile:configfile,
		ConfigPath:configpath,
		ClearType:cleartype,
		COAPort:coaport,
		Community:com,
		Connectivity:connectivity,
		DatabaseName:dbname,
		DatabaseTableName:dbtablename,
		DatabaseType:dbtype,
		DefaultSM:defaultsm,
		DeviceList:devlist,
		ExtensionIp:extip,
		EnablePassword:enpass,
		Features:features,
		Function:func,
		LogDirectory:logdir,
		NRCMD:nrcmd,
		NRCMDUsername:nrcmduser,
		Port:port,
		RedirectPort:redirport,
		RedirectLogPort:redirlogport,
		RootDirectory:rootdir,
		ServerDirectory:serverdir,
		VendorType:ventype,
		Snapshot:snapshot,
		DomainName:domname,
		Application:application,
		Sequence:sequence,
		RP0ConsoleIp:rp0con,
		RP1ConsoleIp:rp1con,
		PortArr:portarr,
		Status:stats,
		Source:src,
		ConnectivityFlag: conflag,
		Page: pageCanvas
    });
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
//	if(globalFlagCommitted == false){
	    devicesArrBC.push({
			DeviceName:devname,
			DeviceType:devtype,
			ObjectPath:devpath,
			Model:model,
			DNDModelType:dndmodel,
			SoftwareVersion:softver,
			OSVersion:osver,
			OSType:ostype,
			SoftwarePackage:softpack,
			ReEvaluate:reeval,
			IpAddress:ipadd,
			DeviceId:devid,
			HostName:hostname,	
			UpdateFlag:update,
			MediaType:media,
			Portname:portname,
			ManagementIp:mgntip,
			ManagementIp2:mgntip2,
			Auxiliary:aux,
			DiscoveryFlag:disflag,
			Exclusivity:exclusive,
			XLocation:xpos,
			YLocation:ypos,
			PowerStatus:powerstats,
			Power:power,
			TftpIpAddress:tftpip,
			TftpHostname:itftphost,
			TftpImagePath:tftpimgpath,
			TftpImageName:tftpimgname,
			TftpUser:tftpuser,
			TftpPassword:tftppass,
			TftpAddress:itftpadd,
			TacacsIpAddress:tacacsip,
			TacacsHostname:tacacshost,
			RadiusHostname:radiusname,
			RadiusIpAddress:rdiusip,
			RadiusUsername:radius,
			RadiusPassword:radiuspass,
			Description:desc,
			Processor:processor,
			ProcessorBoardId:processorboardid,
			Manufacturer:manu,
			SerialNumber:serialnum,
			IOS:ios,
			CPUSpeed:cpuspeed,
			SystemMemory:sysmem,
			NVRAMCF:nvramcp,
			ProcessorMemory:procmem,
			ConnectivityDone:condone,
			ReachabilityDone:reachdone,
			ConvergenceDone:converdone,
			TFTPServer:tftpserver,
			TFTPUser:tuser,
			TFTPPassword:tpass,
			FTPServer:ftpserver,
			FTPUser:ftpuser,
			FTPPassword:ftppass,
			ConfigDetail:configdetail,
			ConfigFilePath:configfilepath,
			ConfigFileName:configfilename,
			ConfigUrl:configurl,
			SaveConfigUrl:saveconurl,
			ConfigServer:configserver,
			ConfigDestination:configdest,
			ImageFilePath:imagefilepath,
			ImageDetail:imagedetail,
			ImageFileName:imagefilename,
			ImageUrl:imageurl,
			SaveImageUrl:saveimageurl,
			ImageServer:imageserver,
			ImageDestination:iamgedest,
			SaveImageEnable:saveimageen,
			SaveConfigEnable:saveconfigen,
			LoadConfigEnable:loadconfigen,
			LoadImageEnable:loadimageen,
			SaveImageDetail:saveimagedetail,
			SaveImageServer:saveimageserver,
			SaveImageDestination:saveimagedest,
			SaveImageUser:saveimageuser,
			SaveImagePassword:saveimagepass,
			SaveImageType:saveimagetype,
			SaveConfigDetail:saveconfigdetail,
			SaveConfigServer:saveconfigserver,
			SaveConfigDestination:saveconfigdest,
			SaveConfigUser:saveconfiguser,
			SaveConfigPassword:saveconfigpass,
			SaveConfigType:saveconfigtype,
			SaveConfigFileName:saveconfigfilename,
			SaveImageFileName:saveimagefilename,
			SystemImageName:sysimagename,
			SystemConfigName:systemconname,
			SaveTypeImage:savetypeimage,
			TypeImage:typeimage,
			SaveTypeConfig:savetypeconfig,
			TypeConfig:typeconfig,
			ChassisPid:chassispid,
			ChassisVid:chassisvid,
			RouteProcessorName:routename,
			TotalMemory:totalmemory,
			TotalMemory2:totalmemory2,
			RouteProcessorName2:routename2,
			RouteRedundant:routeredundant,
			RouteProcessorDescription:routedesc,
			RouteProcessorProductId:routeprodid,
			RouteProcessorProductId2:routeprodid2,
			RouteProcessorVersionId:routeverid,
			RouteProcessorVersionId2:rputeverid2,
			EmbeddedRedundant:embedredundant,
			EmbeddedProcessorName:embedname,
			EmbeddedProcessorName2:embedname2,
			EmbeddedProcessorDescription:embeddesc,
			EmbeddedProcessorProductId:embedproid,
			EmbeddedProcessorProductId2:embedproid2,
			EmbeddedProcessorVersionId:embedverid,
			EmbeddedProcessorVersionId2:embedverid2,
			EmbeddedProcessorNitrox:embednitrox,
			EmbeddedProcessorOcteon:embedocteon,
			EmbeddedProcessorNitrox2:embednotrox2,
			EmbeddedProcessorOcteon2:embedocteon2,
			LineCardName:linename,
			LineCardDescription:linedesc,
			LineCardProductId:lineproid,
			LineCardVersionId:lineverid,
			LineCardNumber:linenum,
			ModuleName:modname,
			ModuleDescription:moddesc,
			ModuleProductId:modproid,
			ModuleVersionId:modverid,
			ProductFamily:profam,
			ServerType:servertype,
			ManagementInterface:mgntint,
			ManagementInterface2:mgntint2,
			ManagementIpMask:mgntmask,
			ManagementIpMask2:mgntmask2,
			ManagementIpv6:mgntipv6,
			ManagementIpv62:mgntipv62,
			ManagementIpv6Prefix:mgntipv5pref,
			ManagementIpv6Prefix2:mgntipv6pref2,
			ProcessorType:protype,
			CPUCores:cpucore,
			ProcessorSockets:prosock,
			CoresPerSocket:corespersock,
			LogicalProcessor:logpro,
			ConsoleIp:conip,
			TitanName:titanname,
			ProcessorFamily:profam,
			ProcessorPId:propid,
			ConsoleNet:connet,
			Ipv6:ipv6,
			Key:key,
			Admin:admin,
			Access:access,
			Account:account,
			AccountPort:accountport,
			AuthenticationDirectory:authendir,
			AuthenticationPort:authenport,
			BEHostlist:behost,
			ConfigMethod:configmethod,
			ConfigName:configname,
			ConfigFile:configfile,
			ConfigPath:configpath,
			ClearType:cleartype,
			COAPort:coaport,
			Community:com,
			Connectivity:connectivity,
			DatabaseName:dbname,
			DatabaseTableName:dbtablename,
			DatabaseType:dbtype,
			DefaultSM:defaultsm,
			DeviceList:devlist,
			ExtensionIp:extip,
			EnablePassword:enpass,
			Features:features,
			Function:func,
			LogDirectory:logdir,
			NRCMD:nrcmd,
			NRCMDUsername:nrcmduser,
			Port:port,
			RedirectPort:redirport,
			RedirectLogPort:redirlogport,
			RootDirectory:rootdir,
			ServerDirectory:serverdir,
			VendorType:ventype,
			Snapshot:snapshot,
			DomainName:domname,
			Application:application,
			Sequence:sequence,
			RP0ConsoleIp:rp0con,
			RP1ConsoleIp:rp1con,
			PortArr:portarr,
			Status:stats,
			Source:src,
			ConnectivityFlag: conflag
	   });

	}
}

/*
 * 
 *  FUNCTION NAME : storeChildDevicesInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : store device information
 *  PARAMETERS    : 
 * 
 */
function storeChildDevicesInformation(chassis,loop,user,esxi,pass,esxipass,objpath,stats,devicename,devname,deviceid,red,model,dndmodel,devtype,deviceresid,macadd,deviceflag,host,update,media,portname,dbresid,contype,portspeed,portband,exactname,loadflag,portview,discover,routepro,embedpro,linecard,exactip,power,application,protoflag,switchport,mapname,control){
	if(control =="undefined" || control == undefined){
        control = '';
    }
	if(protoflag == ""){
		protoflag = false;
	}
	if(update == "" || update ==undefined){
		update = "new";
	}
	if(globalInfoType == "JSON"){
		setDevicesChildInformationJSON(chassis,loop,user,esxi,pass,esxipass,objpath,stats,devicename,devname,deviceid,red,model,dndmodel,devtype,deviceresid,macadd,deviceflag,host,update,media,portname,dbresid,contype,portspeed,portband,exactname,loadflag,portview,discover,routepro,embedpro,linecard,exactip,power,application,protoflag,switchport,mapname,control);
		return;
	}
	deviceArr.push({
		ChassisAddress:chassis,
		LoopBackAddress:loop,
		Username:user,
		ESXIUsername:esxi,
		Password:pass,
		ESXIPassword:esxipass,
		ObjectPath:objpath,
		Status:stats,
		DeviceName:devicename,
		DevName:devname,
		DeviceId:deviceid,
		RedFlag:red,
		ModelType:model,
		DNDModelType:dndmodel,
		DeviceType:devtype,
		DeviceResId:deviceresid,
		MacAddress:macadd,
		DeviceFlag:deviceflag,
		HostName:host,
		UpdateFlag:update,
		MediaType:media,
		Portname:portname,
		DBResId:dbresid,
		ConnectivityType:contype,
		PortSpeed:portspeed,
		PortBandWidth:portband,
		ExactHostName:exactname,
		LoadFlag:loadflag,
		PortView:portview,
		Discovery:discover,
		RouteProcessor:routepro,
		EmbeddedProcessor:embedpro,
		LineCard:linecard,
		ExactIpAdd:exactip,
		PowerStatus:power,
		Application:application,
		ProtoTypeFlag:protoflag,
		SwitchPort:switchport,
		MapName:mapname,
		ControllerInfo:control,
		Page: pageCanvas	
	});
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
//	if(globalFlagCommitted == false){
		deviceArrBC.push({
			ChassisAddress:chassis,
			LoopBackAddress:loop,
			Username:user,
			ESXIUsername:esxi,
			Password:pass,
			ESXIPassword:esxipass,
			ObjectPath:objpath,
			Status:stats,
			DeviceName:devicename,
			DevName:devname,
			DeviceId:deviceid,
			RedFlag:red,
			ModelType:model,
			DNDModelType:dndmodel,
			DeviceType:devtype,
			DeviceResId:deviceresid,
			MacAddress:macadd,
			DeviceFlag:deviceflag,
			HostName:host,
			UpdateFlag:update,
			MediaType:media,
			Portname:portname,
			DBResId:dbresid,
			ConnectivityType:contype,
			PortSpeed:portspeed,
			PortBandWidth:portband,
			ExactHostName:exactname,
			LoadFlag:loadflag,
			PortView:portview,
			Discovery:discover,
			RouteProcessor:routepro,
			EmbeddedProcessor:embedpro,
			LineCard:linecard,
			ExactIpAdd:exactip,
			PowerStatus:power,
			Application:application,
			ProtoTypeFlag:protoflag,
			SwitchPort:switchport,
			MapName:mapname,
			ControllerInfo:control,
			Page: pageCanvas	
		});

	}
}
/*
 * 
 *  FUNCTION NAME : storeRackInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : store rack information
 *  PARAMETERS    : 
 * 
 */
function storeRackInformation(rackdevid,prodnum,swver,rackname,objpath,hwver,num,portgrp,ios,moddesc,sernum,model,board,rackdev,rackid,mapname,redflag,orange,update){
	if(update == "" || update ==undefined){
        update = "new";
    }
	rackArr.push({
		RackDeviceId:rackid,
		ProductNumber:prodnum,
		SwVersion:swver,
		RackName:rackname,
		ObjectPath:objpath,
		HwVersion:hwver,
		Number:num,
		PortGroupSize:portgrp,
		Ios:ios,
		ModuleDescription:moddesc,
		SerialNumber:sernum,
		ModelType:model,
		BoardType:board,
		RackDevName:rackdev,
		RackId:rackid,
		MapName:mapname,
		RedFlag:redflag,
		OrangeFlag:orange,
		UpdateFlag: update,
//		Status: stats,
		Page: pageCanvas
	});
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
///	if(globalFlagCommitted == false){
		rackArrBC.push({
			RackDeviceId:rackid,
			ProductNumber:prodnum,
			SwVersion:swver,
			RackName:rackname,
			ObjectPath:objpath,
			HwVersion:hwver,
			Number:num,
			PortGroupSize:portgrp,
			Ios:ios,
			ModuleDescription:moddesc,
			SerialNumber:sernum,
			ModelType:model,
			BoardType:board,
			RackDevName:rackdev,
			RackId:rackid,
			MapName:mapname,
			RedFlag:redflag,
			OrangeFlag:orange,
			UpdateFlag: update,
//			Status: stats,
			Page: pageCanvas
		});
	}else{
		rackArrAC.push({
            RackDeviceId:rackid,
            ProductNumber:prodnum,
            SwVersion:swver,
            RackName:rackname,
            ObjectPath:objpath,
            HwVersion:hwver,
            Number:num,
            PortGroupSize:portgrp,
            Ios:ios,
            ModuleDescription:moddesc,
            SerialNumber:sernum,
            ModelType:model,
            BoardType:board,
            RackDevName:rackdev,
            RackId:rackid,
            MapName:mapname,
            RedFlag:redflag,
            OrangeFlag:orange,
            UpdateFlag: update,
//            Status: stats
        });
	}
}
/*
 * 
 *  FUNCTION NAME : storeSlotInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   : Mark Anthony O. Elbambo
 *  REVISION DATE : Jan. 13, 2014
 *  REVISION #    : 1
 *  DESCRIPTION   : store slot information
 *  PARAMETERS    : added update flag
 * 
 */
function storeSlotInformation(slotdevid,prodnum,slotname,objpath,num,moddesc,sernum,model,board,slotdev,slotid,redflag,update,stats){
	if(update == "" || update ==undefined){
        update = "new";
    }
	if(globalInfoType == "JSON"){
		setSlotInformation(slotdevid,prodnum,slotname,objpath,num,moddesc,sernum,model,board,slotdev,slotid,redflag,update,stats);
		return;
	}
	slotArr.push({
		SlotDeviceId:slotdevid,
		ProductNumber:prodnum,
		SlotName:slotname,
		ObjectPath:objpath,
		Number:num,
		ModuleDescription:moddesc,
		SerialNumber:sernum,
		ModelType:model,
		BoardType:board,
		SlotDevName:slotdev,
		SlotId:slotid,
		RedFlag:redflag,
		UpdateFlag:update,
//        	Status: stats,
		Page: pageCanvas
	});
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
//	if(globalFlagCommitted == false){
		slotArrBC.push({
			SlotDeviceId:slotdevid,
			ProductNumber:prodnum,
			SlotName:slotname,
			ObjectPath:objpath,
			Number:num,
			ModuleDescription:moddesc,
			SerialNumber:sernum,
			ModelType:model,
			BoardType:board,
			SlotDevName:slotdev,
			SlotId:slotid,
			RedFlag:redflag,
			UpdateFlag:update,
//	    	        Status: stats,
			Page: pageCanvas
		});
	}else{
		slotArrAC.push({
            SlotDeviceId:slotdevid,
            ProductNumber:prodnum,
            SlotName:slotname,
            ObjectPath:objpath,
            Number:num,
            ModuleDescription:moddesc,
            SerialNumber:sernum,
            ModelType:model,
            BoardType:board,
            SlotDevName:slotdev,
            SlotId:slotid,
            RedFlag:redflag,
            UpdateFlag:update,
//            Status: stats,
	    Page: pageCanvas
        });
	}
}
/*
 * 
 *  FUNCTION NAME : storeModuleInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : store module information
 *  PARAMETERS    : 
 * 
 */
function storeModuleInformation(moduleid,moduleresid,moduleslotid,num,moddesc,sernum,modulename,objpath,moddevname,redflag,update){
	if(update == "" || update ==undefined){
        update = "new";
    }
	moduleArr.push({
		ModuleId:moduleid,
		ModuleResId:moduleresid,
		ModuleSlotId:moduleslotid,
		Number:num,
		ModuleDescription:moddesc,
		SerialNumber:sernum,
		ModuleName:modulename,
		ObjectPath:objpath,
		ModuleDevName:moddevname,
		RedFlag:redflag,
		UpdateFlag: update,
//        Status: stats,
	Page: pageCanvas
	});
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
//	if(globalFlagCommitted == false){
		moduleArrBC.push({
			ModuleId:moduleid,
			ModuleResId:moduleresid,
			ModuleSlotId:moduleslotid,
			Number:num,
			ModuleDescription:moddesc,
			SerialNumber:sernum,
			ModuleName:modulename,
			ObjectPath:objpath,
			ModuleDevName:moddevname,
			RedFlag:redflag,
			UpdateFlag: update,
//            		Status: stats,
	    		Page: pageCanvas
		});
	}else{
		moduleArrAC.push({
            ModuleId:moduleid,
            ModuleResId:moduleresid,
            ModuleSlotId:moduleslotid,
            Number:num,
            ModuleDescription:moddesc,
            SerialNumber:sernum,
            ModuleName:modulename,
            ObjectPath:objpath,
            ModuleDevName:moddevname,
            RedFlag:redflag,
            UpdateFlag: update,
//            Status: stats,
	    Page: pageCanvas
        });
	}
}
/*
 * 
 *  FUNCTION NAME : storePicInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : store pic information
 *  PARAMETERS    : 
 * 
 */
function storePicInformation(picid,picresid,picslotid,ver,partnum,num,desc,sernum,jedec,assver,assflag,assid,date,eeprom,picname,objpath,picdevname,redflag,orange,update,stats){
	if(update == "" || update ==undefined){
        update = "new";
    }
	picArr.push({
		PICId:picid,
		PICResId:picresid,
		PICSlotId:picslotid,
		Version:ver,
		PartNumber:partnum,
		Number:num,
		Description:desc,
		SerialNumber:sernum,
		JedecCode:jedec,
		AssemblyVersion:assver,
		AssemblyFlags:assflag,
		AssemblyId:assid,
		Date:date,
		EepromVersion:eeprom,
		PicName:picname,
		ObjectPath:objpath,
		PicDevName:picdevname,
		RedFlag:redflag,
		OrangeFlag:orange,
		UpdateFlag: update,
//        	Status: stats,
		Page: pageCanvas
	});
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
//	if(globalFlagCommitted == false){
		picArrBC.push({
			PICId:picid,
			PICResId:picresid,
			PICSlotId:picslotid,
			Version:ver,
			PartNumber:partnum,
			Number:num,
			Description:desc,
			SerialNumber:sernum,
			JedecCode:jedec,
			AssemblyVersion:assver,
			AssemblyFlags:assflag,
			AssemblyId:assid,
			Date:date,
			EepromVersion:eeprom,
			PicName:picname,
			ObjectPath:objpath,
			PicDevName:picdevname,
			RedFlag:redflag,
			OrangeFlag:orange,
			UpdateFlag: update,
//            		Status: stats,
	    		Page: pageCanvas	
		});
	}else{
		picArrAC.push({
            PICId:picid,
            PICResId:picresid,
            PICSlotId:picslotid,
            Version:ver,
            PartNumber:partnum,
            Number:num,
            Description:desc,
            SerialNumber:sernum,
            JedecCode:jedec,
            AssemblyVersion:assver,
            AssemblyFlags:assflag,
            AssemblyId:assid,
            Date:date,
            EepromVersion:eeprom,
            PicName:picname,
            ObjectPath:objpath,
            PicDevName:picdevname,
            RedFlag:redflag,
            OrangeFlag:orange,
            UpdateFlag: update,
//          Status: stats,
		    Page: pageCanvas
        });
	}
}
/*
 * 
 *  FUNCTION NAME : storePortInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : store port information
 *  PARAMETERS    : 
 * 
 */
function storePortInformation(switchportinfo,switchinfo,vlanid,vlanname,phyport,portresid,portslotid,portid,num,portname,update,portflag,objpath,avail,type,red,partner,bandwidth,speed,enableport,exclusive,tunnelservice,multiservice,porttype,portcheck,partnerportdev,partnerinfo,desc,media,auto,duplex,portconfig,phy,spa,carrier,portcard,ethmode,speed2,sequence,savecon,portDevName,stats){
	if(update == "" || update ==undefined){
        update = "new";
    }
	if(globalInfoType == "JSON"){
        setPortInformation(switchportinfo,switchinfo,vlanid,vlanname,phyport,portresid,portslotid,portid,num,portname,update,portflag,objpath,avail,type,red,partner,bandwidth,speed,enableport,exclusive,tunnelservice,multiservice,porttype,portcheck,partnerportdev,partnerinfo,desc,media,auto,duplex,portconfig,phy,spa,carrier,portcard,ethmode,speed2,sequence,savecon,portDevName,stats);
		//setSubChannelInformation("",switchportinfo,"",exclusive,"","",duplex,phy,"","",auto,portconfig,savecon,"","",spa,"",partnerinfo,"",speed2,"","","",ethmode,"",partnerportdev,"",desc,portcard,objpath,"",phyport,tunnelservice,portcheck,enableport,speed,num,porttype,"",multiservice,update,media,bandwidth,avail,sequence,portflag,portname,"",carrier,partner,vlanid,switchinfo,vlanname);
        return;
    }
	portArr.push({
		SwitchPortInfo:switchportinfo,
		SwitchInfo:switchinfo,
		VlanId:vlanid,
		VlanName:vlanname,
		PhysicalPortType:phyport,
		PortResId:portresid,
		PortSlotId:portslotid,
		PortId:portid,
		Number:num,
		PortName:portname,
		UpdateFlag:update,
		PortFlag:portflag,
		ObjectPath:objpath,
		Availability:avail,
		Type:type,
		RedFlag:red,
		PartnerPort:partner,
		Bandwidth:bandwidth,
		Speed:speed,
		EnablePort:enableport,
		Exclusivity:exclusive,
		TunnelServicesPIC:tunnelservice,
		MultiServicesPIC:multiservice,
		PortType:porttype,
		PortCheck:portcheck,
		PartnerPortDevice:partnerportdev,
		PartnerInformation:partnerinfo,
		Description:desc,
		MediaType:media,
		AutoNegotiation:auto,
		Duplexity:duplex,
		PortConfig:portconfig,
		Phy:phy,
		Spa:spa,
		CarrierCard:carrier,
		PortCard:portcard,
		EthMode:ethmode,
		Speed2:speed2,
		Sequence:sequence,
		PortDevName:portDevName,
		SaveConnectivity:savecon,
//	        Status: stats,
		Page: pageCanvas
	});
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
//	if(globalFlagCommitted == false){
		portArrBC.push({
			SwitchPortInfo:switchportinfo,
			SwitchInfo:switchinfo,
			VlanId:vlanid,
			VlanName:vlanname,
			PhysicalPortType:phyport,
			PortResId:portresid,
			PortSlotId:portslotid,
			PortId:portid,
			Number:num,
			PortName:portname,
			UpdateFlag:update,
			PortFlag:portflag,
			ObjectPath:objpath,
			Availability:avail,
			Type:type,
			RedFlag:red,
			PartnerPort:partner,
			Bandwidth:bandwidth,
			Speed:speed,
			EnablePort:enableport,
			Exclusivity:exclusive,
			TunnelServicesPIC:tunnelservice,
			MultiServicesPIC:multiservice,
			PortType:porttype,
			PortCheck:portcheck,
			PartnerPortDevice:partnerportdev,
			PartnerInformation:partnerinfo,
			Description:desc,
			MediaType:media,
			AutoNegotiation:auto,
			Duplexity:duplex,
			PortConfig:portconfig,
			Phy:phy,
			Spa:spa,
			CarrierCard:carrier,
			PortCard:portcard,
			EthMode:ethmode,
			Speed2:speed2,
			Sequence:sequence,
			PortDevName:portDevName,
			SaveConnectivity:savecon,
//            		Status: stats,
			Page: pageCanvas
		});
	}else{
		portArrAC.push({
            SwitchPortInfo:switchportinfo,
            SwitchInfo:switchinfo,
            VlanId:vlanid,
            VlanName:vlanname,
            PhysicalPortType:phyport,
            PortResId:portresid,
            PortSlotId:portslotid,
            PortId:portid,
            Number:num,
            PortName:portname,
            UpdateFlag:update,
            PortFlag:portflag,
            ObjectPath:objpath,
            Availability:avail,
            Type:type,
            RedFlag:red,
            PartnerPort:partner,
            Bandwidth:bandwidth,
            Speed:speed,
            EnablePort:enableport,
            Exclusivity:exclusive,
            TunnelServicesPIC:tunnelservice,
            MultiServicesPIC:multiservice,
            PortType:porttype,
            PortCheck:portcheck,
            PartnerPortDevice:partnerportdev,
            PartnerInformation:partnerinfo,
            Description:desc,
            MediaType:media,
            AutoNegotiation:auto,
            Duplexity:duplex,
            PortConfig:portconfig,
            Phy:phy,
            Spa:spa,
            CarrierCard:carrier,
            PortCard:portcard,
            EthMode:ethmode,
            Speed2:speed2,
            Sequence:sequence,
            PortDevName:portDevName,
            SaveConnectivity:savecon,
//            Status: stats,
	    Page: pageCanvas
        });
	}
}
/*
 * 
 *  FUNCTION NAME : storeLinkInformation
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   : Mark Elbambo
 *  REVISION DATE : Jan 16,2014
 *  REVISION #    : 1
 *  DESCRIPTION   : store link information
 *  PARAMETERS    : added lineConnectedAC
 * 
 */
function storeLinkInformation(name,sourcedev,destdev,sourceport,destport,id,srcip,dstip,portid,portid2,dest,source,linkname,checkcon,condone,srcslot,dstslot,srcport,dstport,portmonitor,conflag){
	if(globalInfoType == "JSON"){
		setPortMapInformation(name,sourcedev,destdev,sourceport,destport,id,srcip,dstip,portid,portid2,dest,source,linkname,checkcon,condone,srcslot,dstslot,srcport,dstport,portmonitor,conflag);
	}
//	lineConnected.push({
	window['variable' + dynamicLineConnected[pageCanvas]].push({
		Name:name,
//		SourceDevice:sourcedev,
//		DestinationDevice:destdev,
		SourceDeviceXLocation: sourcedev.XLocation,
		SourceDeviceYLocation: sourcedev.YLocation,
		SourceDeviceObjectPath: sourcedev.ObjectPath,
		SourceDeviceDeviceName: sourcedev.DeviceName,
		SourceDeviceDeviceType: sourcedev.DeviceType,
		DestinationDeviceXLocation: destdev.XLocation,
		DestinationDeviceYLocation: destdev.YLocation,
		DestinationDeviceObjectPath: destdev.ObjectPath,
		DestinationDeviceDeviceName: destdev.DeviceName,
		DestinationDeviceDeviceType: destdev.DeviceType,
		SourcePort:sourceport,
		DesinationPort:destport,
		Id:id,
		SrcIp:srcip,
		DstIp:dstip,
		Port1Id:portid,
		Port2Id:portid2,
		Source:source,
		Destination:dest,
		LinkName:linkname,
		CheckConnectivity:checkcon,
		ConnectivityDone:condone,
		SrcMonitorSlot:srcslot,
		DstMonitorSlot:dstslot,
		SrcMonitorPort:srcport,
		DstMonitorPort:dstport,
		PortMonitorEnable:portmonitor,
		ConnectivityFlag:conflag,
	    Page: pageCanvas
    });
//	console.log('lineconnected', window['variable' + dynamicLineConnected[pageCanvas]]);
	if(window['variable' + dynamicFlagCommitted[pageCanvas] ]==false){
//	if(globalFlagCommitted == false){
//		lineConnected2.push({
		window['variable' + dynamicLineConnected2[pageCanvas]].push({
            Name:name,
//            SourceDevice:sourcedev,
//            DestinationDevice:destdev,
            SourceDeviceXLocation: sourcedev.XLocation,
	        SourceDeviceYLocation: sourcedev.YLocation,
			SourceDeviceObjectPath: sourcedev.ObjectPath,
			SourceDeviceDeviceName: sourcedev.DeviceName,
			SourceDeviceDeviceType: sourcedev.DeviceType,
    	    DestinationDeviceXLocation: destdev.XLocation,
	        DestinationDeviceYLocation: destdev.YLocation,
			DestinationDeviceObjectPath: destdev.ObjectPath,
			DestinationDeviceDeviceName: destdev.DeviceName,
			DestinationDeviceDeviceType: destdev.DeviceType,
            SourcePort:sourceport,
            DesinationPort:destport,
            Id:id,
            SrcIp:srcip,
            DstIp:dstip,
            Port1Id:portid,
            Port2Id:portid2,
            Source:source,
            Destination:dest,
            LinkName:linkname,
            CheckConnectivity:checkcon,
            ConnectivityDone:condone,
            SrcMonitorSlot:srcslot,
            DstMonitorSlot:dstslot,
            SrcMonitorPort:srcport,
            DstMonitorPort:dstport,
            PortMonitorEnable:portmonitor,
            ConnectivityFlag:conflag,
		    Page: pageCanvas
    	});
	}else{
		lineConnectedAC.push({
            Name:name,
//            SourceDevice:sourcedev,
//          DestinationDevice:destdev,
          	SourceDeviceXLocation: sourcedev.XLocation,
        	SourceDeviceYLocation: sourcedev.YLocation,
			SourceDeviceObjectPath: sourcedev.ObjectPath,
			SourceDeviceDeviceName: sourcedev.DeviceName,
			SourceDeviceDeviceType: sourcedev.DeviceType,
    	    DestinationDeviceXLocation: destdev.XLocation,
	        DestinationDeviceYLocation: destdev.YLocation,
			DestinationDeviceObjectPath: destdev.ObjectPath,
			DestinationDeviceDeviceName: destdev.DeviceName,
			DestinationDeviceDeviceType: destdev.DeviceType,
            SourcePort:sourceport,
            DesinationPort:destport,
            Id:id,
            SrcIp:srcip,
            DstIp:dstip,
            Port1Id:portid,
            Port2Id:portid2,
            Source:source,
            Destination:dest,
            LinkName:linkname,
            CheckConnectivity:checkcon,
            ConnectivityDone:condone,
            SrcMonitorSlot:srcslot,
            DstMonitorSlot:dstslot,
            SrcMonitorPort:srcport,
            DstMonitorPort:dstport,
            PortMonitorEnable:portmonitor,
            ConnectivityFlag:conflag,
		    Page: pageCanvas
        });
	}

}
/*
 * 
 *  FUNCTION NAME : getDeviceType
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : store device information
 *  PARAMETERS    : _objectType
 * 
 */
function getDeviceType(_objectType){
	var type = "Dut" ;
	switch (_objectType.toLowerCase()) {
		case "testtool" :
		case "agilent" :
		case "8100lt" :
		case "8100lte" :
		case "abacus" :
		case "avalanche" :
		case "c2k-ats" :
		case "dls" :
		case "landslide" :
		case "paragon-x" :
		case "ixia" :
		case "stc" :
		case "shenick" :
		case "spirent" :
		case "n2x" :
		case "3500" :
		case "5293" :
		case "5288" :
		case "5273" :
		case "5236" :
		case "5204" :
		case "optixiaxl10-01" :
		case "olm1000stxs24" :
		case "olm1000stx24" :
		case "lsm10gxl6-02" :
		case "anue nto 5204" :
		case "anue nto 5236" :
		case "anue nto 5273" :
		case "anue nto 5288" :
		case "anue nto 5293" :
		case "breakingpoint firestorm" :
		case "breakingpoint firestorm one" :
		case "breakingpoint storm" :
		case "400t" :
		case "anue network emulator" :
		case "anue 3500" :
		case "ixn2x" :
		case "ixcatapult" :
		case "network visibility" :
		case "network security" :
		case "tgen and protocol emulator" :
		case "8100 location technology" :
		case "8100 lte" :
		case "abacus" :
		case "avalanche" :
		case "c2k-ats" :
		case "dls" :
		case "landslide" :
		case "spirent paragon-x" :
		case "smartsight central" :
		case "spirent ine" :
		case "spirent itest" :
		case "spirent studio performance" :
		case "spirent studio security" :
		case "spirent testcenter" :
		case "spirent testcenter live" :
		case "sr5500" :
		case "tech-x flex" :
		case "spirent nocode" :
		case "vr5" :
		case "8100 umts" :
		case "ax/4000" :
		case "cs8 device tester" :
		case "gss5700" :
		case "mimo/beamforming test system" :
		case "networks and applications" :
		case "mobile devices and network equipment" :
			type = "TestTool";
			break;
		case "router" :
		case "alcatel" :
		case "alcatel7710sr" :
		case "alcatel7750sr" :
		case "ciena" :
		case "cisco" :
		case "ciscoxe" :
		case "ciscoxeasr1004" :
		case "ciscoxeasr1002f" :
		case "ciscoxeasr1006" :
		case "ciscoxr" :
		case "cisco3745" :
		case "cisco3725" :
		case "cisco3750" :
		case "3725" :
		case "3750" :
		case "cisco6509" :
		case "cisco6503" :
		case "cisco7206" :
		case "cisco2800" :
		case "cisco2851" :
		case "cisco2821" :
		case "cisco2811" :
		case "cisco2801" :
		case "2851" :
		case "2821" :
		case "2811" :
		case "2801" :
		case "cisco xr" :
		case "ciscoios" :
		case "ciscocatalyst" :
		case "ciscocatalyst3500" :
		case "catalyst 3500" :
		case "ws-c3550-48" :
		case "ws-c3524-xl" :
		case "ciscocatalyst6500" :
		case "catalyst 6500" :
		case "ciscocrs" :
		case "crs8slot" :
		case "crs4slot" :
		case "crsmulti" :
		case "ciscoasr" :
		case "ciscocatalyst2900" :
		case "catalyst 2900" :
		case "cisco3600" :
		case "3600" :
		case "cisco7600" :
		case "7600" :
		case "cisco7606" :
		case "7606" :
		case "cisco7200" :
		case "cisco7206vxr" :
		case "7200" :
		case "7206" :
		case "7206vxr" :
		case "cisco3700" :
		case "3700" :
		case "cisco3900" :
		case "3900" :
		case "cisco3800" :
		case "3800" :
		case "3845" :
		case "3825" :
		case "ciscogsr" :
		case "ciscogsr2" :
		case "ciscocrs1" :
		case "ciscocrs2" :
		case "ciscoasr9k1" :
		case "ciscoasr9k2" :
		case "force10" :
		case "WS-C65" :
		case "cisco3750" :
		case "_cisco3725" :
        case "_cisco3750" :
        case "ciscoswitch" :
        case "ws-c65" :
		case "ws-c3750-48ts" :
		case "ws-c6509-e" :
		case "cisco3745" :
		case "cisco3725" :
		case "cisco3750" :
		case "3725" :
		case "3750" :
		case "cisco6509" :
		case "cisco6503" :
		case "cisco7206" :
		case "3745" :
		case "l3switch" :
		case "foundry" :
		case "juniper" :
		case "mseries" :
		case "m7i" :
		case "m10i" :
		case "m40e" :
		case "m120" :
		case "m320" :
        case "m5" :
		case "m20" :
		case "jseries" :
		case "j2320" :
		case "j2350" :
		case "j4310" :
		case "j4300" :
		case "j4350" :
		case "j6350" :
        case "mx80" :
		case "mx240" :
		case "mx480" :
		case "mx960" :
		case "tseries" :
		case "t640" :
		case "dut":
		case "cisco12000" :
		case "12006" :
		case "12008" :
		case "12010" :
		case "12012" :
		case "12016" :
		case "12410" :
		case "12410/prp" :
		case "12406/prp" :
		case "12406" :
		case "12416" :
		case "12810" :
		case "12816" :
		case "crs-16/s" :
		case "asr1k" :
		case "asr1002" :
		case "asr1002-x" :
		case "asr1002f" :
		case "asr1001" :
		case "asr1001x" :
		case "asr1001-x" :
		case "asr1013" :
		case "asr1004" :
		case "asr1002-f" :
		case "asr1006" :
		case "ciscoxeasr1004" :
		case "ciscoxeasr1002f" :
		case "ciscoxeasr1006" :
		case "ciscoxeasr" :
		case "ciscoxeasr1002" :
		case "ciscoxeasr1001" :
		case "ciscoxeasr1001-x" :
		case "ciscoxeasr1001x" :
		case "ciscoxeasr1004" :
		case "ciscoxeasr1002f" :
		case "ciscoxeasr1006" :
		case "asr1002" :
		case "asr1004" :
		case "asr1002-f" :
		case "asr1006" :
		case "ciscoxeasr1004" :
		case "ciscoxeasr1002f" :
		case "ciscoxeasr1006" :
		case "cisco3845" :
		case "3845" :
		case "cisco3825" :
		case "3825" :
		case "asr9k" :
		case "3900":
		case "3945":
		case "3945e":
		case "3925":
		case "3925e":
		case "7201":
		case "7204vxr":
		case "7613":
		case "7604":
		case "7603":
		case "7609":
		case "2900":
		case "2951":
		case "2921":
		case "2911":
		case "2901":
		case "12416":
		case "3640":
		case "3620":
		case "asr9001":
		case "asr9006":
		case "asr9010":
		case "asr9922":
		case "1900":
		case "1941":
		case "1921":
		case "1941w":
			type = "Dut";
			break;
		case "3500-48-poe(j9473a)":
		case "3500-24-poe(j9471a)":
		case "3500-48(j9471a)":
		case "3500-24(j9470a)":
		case "6296up":
		case "6248up":
		case "6298up":
		case "6120xp":
		case "6140xp":
		case "c460 m2":
		case "c260 m2":
		case "c250 m2":
		case "c240 m3":
		case "c220 m3":
		case "c210 m2":
		case "c200 m2":
		case "c24 m3":
		case "c22 m3":
		case "rp208-30-u-1":
		case "r42610":
		case "b440 m2":
		case "b420 m3":
		case "b250 m2":
		case "b230 m2":
		case "b200 m2":
		case "b200 m3":
		case "b22 m3":
			type = "Server";
			break;
		case "switch" :
		case "onpath" :
		case "mrv" :
		case "glx" :
		case "l2 switch" :
		case "l1 switch" :
		case "san switch" :
		case "l2switch" :
		case "hp" :
		case "procurve" :
		case "3500yl" :
		case "1600m" :
		case "2424m" :
		case "4000m" :
		case "8000m" :
		case "cisco3725" :
		case "cisco3725f" :
		case "cisco3745f" :
		case "juniperex" :
		case "juniperex2500" :
		case "juniperex3200" :
		case "juniperex4200" :
		case "juniperex4500" :
		case "juniperex8200" :
			type = "Switch";	
			break;
		case "ucs" :
		case "centos" :
		case "debian" :
		case "redhat" :
		case "solaris" :
		case "windows" :
		case "gentoo" :
		case "suse" :
		case "vmware" :
		case "server" :
			type = "Server";	
			break;
		case "patch_panel" :
			type = "Patch_panel";	
			break;
		case "device" :
			type = "Device";	
			break;
		case "storage" :
			type = "Storage";	
			break;
		case "vlan" :
			type = "Vlan";	
			break;
	}
	var myIxia = _objectType.match(/ixia/gi);
	if(myIxia != null && myIxia != undefined && myIxia != ""){
		type = "TestTool";
	}
	return type;
}																						
/*
 * 
 *  FUNCTION NAME : getManufacturer
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get manufacturer
 *  PARAMETERS    : iconName
 * 
 */
function getManufacturer(iconName){
	var type = "cisco";
	switch (iconName.toLowerCase()) {
		case "alcatel7710sr" :
		case "alcatel7750sr" :
			type = "alcatel";
			break;
	   	case "mSeries" :
		case "j2300Series" :
		case "m7i" :
		case "m10i" :
		case "m40e" :
		case "m120" :
		case "m320" :
        case "m5" :
		case "m20" :
		case "jSeries" :
		case "jseries" :
		case "j2320" :
		case "j2350" :
		case "j4310" :
		case "j4350" :
		case "j6350" :
		case "tSeries" :
		case "tseries" :
		case "mseries" :
		case "mxseries" :
		case "t640" :
			type = "juniper";
			break;					
		case "ciscocatalyst3500" :
		case "ciscocatalyst6500" :
		case "6500" :
		case "ws-c65" :
		case "ciscocatalyst2900" :
		case "cisco3600" :
		case "3600" :
		case "3945" :
		case "3900" :
		case "3945e" :
		case "3925" :
		case "3945e" :
		case "cisco7600" :
		case "7600" :
		case "cisco7606" :
		case "7606" :
		case "cisco3700" :
		case "3700" :
		case "cisco3800" :
		case "3800" :
		case "cisco3900" :
		case "3900" :
		case "cisco7200" :
		case "7200" :
		case "cisco7300" :
		case "cisco7301" :
		case "7300" :
		case "7301" :
		case "_cisco3750" :
		case "ciscogsr" :
		case "gsr" :
		case "ciscogsr2" :
		case "ciscocrs" :
		case "crs8slot" :
		case "crs4slot" :
		case "crsmulti" :
		case "crs" :
		case "ciscoios" :
		case "ios" :
		case "ios-xr" :
		case "ciscoxe" :
		case "ios-xe" :
		case "ciscocrs2" :
		case "ciscoasr" :
		case "asr9k" :
		case "ciscoasr9k1" :
		case "ciscoasr9k2" :
		case "ciscoxe" :
		case "ciscoxeasr" :
		case "cisco3745" :
		case "cisco3750" :
		case "3750" :
		case "cisco3725" :
		case "3725" :
		case "cisco2800" :
		case "cisco3845" :
		case "3845" :
		case "cisco3825" :
		case "3825" :
		case "2800" :
		case "cisco2851" :
		case "2851" :
		case "cisco2821" :
		case "2821" :
		case "cisco2811" :
		case "2811" :
		case "cisco2801" :
		case "2801" :
		case "3745" :
		case "7206" :
		case "7206vxr" :
		case "1000v" :
		case "csr1000v" :
		case "ciscocsr" :
		case "cisco4400" :
		case "4400" :
		case "4430" :
		case "4450" :
		case "ciscoisr" :
		case "isr-ng" :
		case "isr4451" :
		case "isr4451/k9" :
		case "junos" :
		case "utah" :
		case "sword" :
		case "dagger" :
		case "daggerlite" :
		case "dagger lite" :
		case "crs-4/s" :
		case "crs-16/s" :
		case "crs-8/s" :
		case "6509" :
		case "cisco6509" :
		case "cisco6503" :
		case "cisco7206vxr" :
		case "cisco12000" :
		case "12000" :
		case "12006" :
		case "12008" :
		case "12010" :
		case "12012" :
		case "12016" :
		case "12410" :
		case "crs-16/s" :
		case "12410/prp" :
		case "12406/prp" :
		case "12406" :
		case "12416" :
		case "12810" :
		case "12816" :
		case "ciscoxeasr1002" :
		case "ciscoxeasr1001" :
		case "ciscoxeasr1001x" :
		case "ciscoxeasr1001-x" :
		case "asr1002" :
		case "asr1002-x" :
		case "asr1002f" :
		case "asr1001" :
		case "asr1001x" :
		case "asr1001-x" :
		case "asr1013" :
		case "asr1004" :
		case "asr1002-f" :
		case "asr1006" :
		case "ciscoxeasr1004" :
		case "ciscoxeasr1002f" :
		case "ciscoxeasr1006" :
		case "WS-C65" :
		case "asr1k" :
		case "3845" :
		case "ws-c6503-e" :
		case "ciscoxr" :
		case "3900":
		case "3945":
		case "3945e":
		case "3925":
		case "3925e":
		case "7201":
		case "7204vxr":
		case "7613":
		case "7604":
		case "7603":
		case "7609":
		case "2900":
		case "2951":
		case "2921":
		case "2911":
		case "2901":
		case "12416":
		case "3640":
		case "3620":
		case "asr9001":
		case "asr9006":
		case "asr9010":
		case "asr9922":
		case "1900":
		case "1941":
		case "1921":
		case "1941w":
		case "892":
			type = "cisco";
			break;
		case "ixia" :
			type = "ixia";
			break;
		case "n2x" :
		case "agilent" :
			type = "n2x";
			break;
		case "stc" :
			type = "stc";
			break;
		case "ucs" :
		case "centos" :
		case "debian" :
		case "redhat" :
		case "solaris" :
		case "windows" :
		case "gentoo" :
		case "suse" :
		case "vmware" :
			type = "Server";	
			break;
	}
	return type
}

/*
 * 
 *  FUNCTION NAME : setValuesFromDragAndDrop
 *  AUTHOR        : Juvindle Tina
 *  DATE          : December 6, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : set values from drag and drop
 *  PARAMETERS    : 
 * 
 */
function setValuesFromDragAndDrop(){
	for(var t=0; t<devicesArrBC.length; t++){
		var devices = devicesArrBC[t];
		storeDeviceInformation(devices.DeviceName,devices.DeviceType,devices.ObjectPath,devices.Model,devices.DNDModelType,devices.SoftwareVersion,devices.OSVersion,devices.OSType,devices.SoftwarePackage,devices.ReEvaluate,devices.IpAddress,devices.DeviceId,devices.HostName,devices.UpdateFlag,devices.MediaType,devices.Portname,devices.ManagementIp,devices.ManagementIp2,devices.Auxiliary,devices.DiscoveryFlag,devices.Exclusivity,devices.XLocation,devices.YLocation,devices.PowerStatus,devices.Power,devices.TftpIpAddress,devices.TftpHostname,devices.TftpImagePath,devices.TftpImageName,devices.TftpUser,devices.TftpPassword,devices.TftpAddress,devices.TacacsIpAddress,devices.TacacsHostname,devices.RadiusHostname,devices.RadiusIpAddress,devices.RadiusUsername,devices.RadiusPassword,devices.Description,devices.Processor,devices.ProcessorBoardId,devices.Manufacturer,devices.SerialNumber,devices.IOS,devices.CPUSpeed,devices.SystemMemory,devices.NVRAMCF,devices.ProcessorMemory,devices.ConnectivityDone,devices.ReachabilityDone,devices.ConvergenceDone,devices.TFTPServer,devices.TFTPUser,devices.TFTPPassword,devices.FTPServer,devices.FTPUser,devices.FTPPassword,devices.ConfigDetail,devices.ConfigFilePath,devices.ConfigFileName,devices.ConfigUrl,devices.SaveConfigUrl,devices.ConfigServer,devices.ConfigDestination,devices.ImageFilePath,devices.ImageDetail,devices.ImageFileName,devices.ImageUrl,devices.SaveImageUrl,devices.ImageServer,devices.ImageDestination,devices.SaveImageEnable,devices.SaveConfigEnable,devices.LoadConfigEnable,devices.LoadImageEnable,devices.SaveImageDetail,devices.SaveImageServer,devices.SaveImageDestination,devices.SaveImageUser,devices.SaveImagePassword,devices.SaveImageType,devices.SaveConfigDetail,devices.SaveConfigServer,devices.SaveConfigDestination,devices.SaveConfigUser,devices.SaveConfigPassword,devices.SaveConfigType,devices.SaveConfigFileName,devices.SaveImageFileName,devices.SystemImageName,devices.SystemConfigName,devices.SaveTypeImage,devices.TypeImage,devices.SaveTypeConfig,devices.TypeConfig,devices.ChassisPid,devices.ChassisVid,devices.RouteProcessorName,devices.TotalMemory,devices.TotalMemory2,devices.RouteProcessorName2,devices.RouteRedundant,devices.RouteProcessorDescription,devices.RouteProcessorProductId,devices.RouteProcessorProductId2,devices.RouteProcessorVersionId,devices.RouteProcessorVersionId2,devices.EmbeddedRedundant,devices.EmbeddedProcessorName,devices.EmbeddedProcessorName2,devices.EmbeddedProcessorDescription,devices.EmbeddedProcessorProductId,devices.EmbeddedProcessorProductId2,devices.EmbeddedProcessorVersionId,devices.EmbeddedProcessorVersionId2,devices.EmbeddedProcessorNitrox,devices.EmbeddedProcessorOcteon,devices.EmbeddedProcessorNitrox2,devices.EmbeddedProcessorOcteon2,devices.LineCardName,devices.LineCardDescription,devices.LineCardProductId,devices.LineCardVersionId,devices.LineCardNumber,devices.ModuleName,devices.ModuleDescription,devices.ModuleProductId,devices.ModuleVersionId,devices.ProductFamily,devices.ServerType,devices.ManagementInterface,devices.ManagementInterface2,devices.ManagementIpMask,devices.ManagementIpMask2,devices.ManagementIpv6,devices.ManagementIpv62,devices.ManagementIpv6Prefix,devices.ManagementIpv6Prefix2,devices.ProcessorType,devices.CPUCores,devices.ProcessorSockets,devices.CoresPerSocket,devices.LogicalProcessor,devices.ConsoleIp,devices.TitanName,devices.ProcessorFamily,devices.ProcessorPId,devices.ConsoleNet,devices.Ipv6,devices.Key,devices.Admin,devices.Access,devices.Account,devices.AccountPort,devices.AuthenticationDirectory,devices.AuthenticationPort,devices.BEHostlist,devices.ConfigMethod,devices.ConfigName,devices.ConfigFile,devices.ConfigPath,devices.ClearType,devices.COAPort,devices.Community,devices.Connectivity,devices.DatabaseName,devices.DatabaseTableName,devices.DatabaseType,devices.DefaultSM,devices.DeviceList,devices.ExtensionIp,devices.EnablePassword,devices.Features,devices.Function,devices.LogDirectory,devices.NRCMD,devices.NRCMDUsername,devices.Port,devices.RedirectPort,devices.RedirectLogPort,devices.RootDirectory,devices.ServerDirectory,devices.VendorType,devices.Snapshot,devices.DomainName,devices.Application,devices.Sequence,devices.RP0ConsoleIp,devices.RP1ConsoleIp,devices.Source,devices.PortArr,devices.Status);
	}
	for(var t=0; t<deviceArrBC.length; t++){
		var device = deviceArrBC[t];
		storeChildDevicesInformation(device.ChassisAddress,device.LoopBackAddress,device.Username,device.ESXIUsername,device.Password,device.ESXIPassword,device.ObjectPath,device.Status,device.DeviceName,device.DevName,device.DeviceId,device.RedFlag,device.ModelType,device.DNDModelType,device.DeviceType,device.DeviceResId,device.MacAddress,device.DeviceFlag,device.HostName,device.UpdateFlag,device.MediaType,device.Portname,device.DBResId,device.ConnectivityType,device.PortSpeed,device.PortBandWidth,device.ExactHostName,device.LoadFlag,device.PortView,device.Discovery,device.RouteProcessor,device.EmbeddedProcessor,device.LineCard,device.ExactIpAdd,device.PowerStatus,device.Application,device.ProtoTypeFlag,device.SwitchPort,device.MapName,device.ControllerInfo);
	}
	for(var t=0; t<rackArrBC.length; t++){
		var rack = rackArrBC[t];
		storeRackInformation(rack.RackDeviceId,rack.ProductNumber,rack.SwVersion,rack.RackName,rack.ObjectPath,rack.HwVersion,rack.Number,rack.PortGroupSize,rack.Ios,rack.ModuleDescription,rack.SerialNumber,rack.ModelType,rack.BoardType,rack.RackDevName,rack.RackId,rack.MapName,rack.RedFlag,rack.OrangeFlag);
	}
	for(var t=0; t<slotArrBC.length; t++){
		var slot = slotArrBC[t];
		storeSlotInformation(slot.SlotDeviceId,slot.ProductNumber,slot.SlotName,slot.ObjectPath,slot.Number,slot.ModuleDescription,slot.SerialNumber,slot.ModelType,slot.BoardType,slot.SlotDevName,slot.SlotId,slot.RedFlag,slot.UpdateFlag);
	}
	for(var t=0; t<moduleArrBC.length; t++){
		var module = moduleArrBC[t];
		storeModuleInformation(module.ModuleId,module.ModuleResId,module.ModuleSlotId,module.Number,module.ModuleDescription,module.SerialNumber,module.ModuleName,module.ObjectPath,module.ModuleDevName,module.RedFlag);
	}
	for(var t=0; t<picArrBC.length; t++){
		var pic = picArrBC[t];
		storePicInformation(pic.PICId,pic.PICResId,pic.PICSlotId,pic.Version,pic.PartNumber,pic.Number,pic.Description,pic.SerialNumber,pic.JedecCode,pic.AssemblyVersion,pic.AssemblyFlags,pic.AssemblyId,pic.Date,pic.EepromVersion,pic.PicName,pic.ObjectPath,pic.PicDevName,pic.RedFlag,pic.OrangeFlag);
	}
	for(var t=0; t<portArrBC.length; t++){
		var port = portArrBC[t];
		storePortInformation(port.SwitchPortInfo,port.SwitchInfo,port.VlanId,port.VlanName,port.PhysicalPortType,port.PortResId,port.PortSlotId,port.PortId,port.Number,port.PortName,port.UpdateFlag,port.PortFlag,port.ObjectPath,port.Availability,port.Type,port.RedFlag,port.PartnerPort,port.Bandwidth,port.Speed,port.EnablePort,port.Exclusivity,port.TunnelServicesPIC,port.MultiServicesPIC,port.PortType,port.PortCheck,port.PartnerPortDevice,port.PartnerInformation,port.Description,port.MediaType,port.AutoNegotiation,port.Duplexity,port.PortConfig,port.Phy,port.Spa,port.CarrierCard,port.PortCard,port.EthMode,port.Speed2,port.Sequence,port.SaveConnectivity,port.PortDevName)
	}
	for(var t=0; t<lineConnected2.length; t++){
		var link =lineConnected2[t];
		storeLinkInformation(link.Name,link.SourceDevice,link.DestinationDevice,link.SourcePort,link.DesinationPort,link.Id,link.SrcIp,link.DstIp,link.Port1Id,link.Port2Id,link.Destination,link.Source,link.LinkName,link.CheckConnectivity,link.ConnectivityDone,link.SrcMonitorSlot,link.DstMonitorSlot,link.SrcMonitorPort,link.DstMonitorPort,link.PortMonitorEnable,link.ConnectivityFlag);
	}
}
/*
 * 
 *  FUNCTION NAME : EnableFilter
 *  AUTHOR        : James Turingan
 *  DATE          : December 18, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */
function EnableFilter(type){

	switch(type){
		case "software":
			if($('#systemFilter').is(':checked')){
				$('#OSselF').selectmenu('enable');
				$('#OSVersionselF').selectmenu('enable');
				$('#SWselF').selectmenu('enable');
			}else{
				$('#OSselF').selectmenu('disable');
				$('#OSVersionselF').selectmenu('disable');
				$('#SWselF').selectmenu('disable');
			}
		break;
		case "system":
			if($('#systemFilter6').is(':checked')){
				$('#ProductselF').selectmenu('enable');
				$('#sysNameselF').selectmenu('enable');
				$('#VersionselF').selectmenu('enable');
			}else{
				$('#ProductselF').selectmenu('disable');
				$('#sysNameselF').selectmenu('disable');
				$('#VersionselF').selectmenu('disable');
			}
		break;
		case "route":
			if($('#RouteFilter').is(':checked')){	
				$('#routeProductselF').selectmenu('enable');
				$('#routeNameselF').selectmenu('enable');
				$('#routeVersionselF').selectmenu('enable');
			}else{
				$('#routeProductselF').selectmenu('disable');
				$('#routeNameselF').selectmenu('disable');
				$('#routeVersionselF').selectmenu('disable');
			}
		break;
		case "embedded":
			if($('#EmbeddedFilter').is(':checked')){	
				$('#embProductselF').selectmenu('enable');
				$('#embNameselF').selectmenu('enable');
				$('#embVersionselF').selectmenu('enable');
			}else{
				$('#embProductselF').selectmenu('disable');
				$('#embNameselF').selectmenu('disable');
				$('#embVersionselF').selectmenu('disable');
			}
		break;
		case "linecard":
			if($('#LineFilter').is(':checked')){	
				$('#lineProductselF').selectmenu('enable');
				$('#lineNameselF').selectmenu('enable');
				$('#lineVersionselF').selectmenu('enable');
			}else{
				$('#lineProductselF').selectmenu('disable');
				$('#lineNameselF').selectmenu('disable');
				$('#lineVersionselF').selectmenu('disable');
			}
		break;
		case "module":
			if($('#ModuleFilter').is(':checked')){	
				$('#modProductselF').selectmenu('enable');
				$('#modNameselF').selectmenu('enable');
				$('#modVersionselF').selectmenu('enable');
			}else{
				$('#modProductselF').selectmenu('disable');
				$('#modNameselF').selectmenu('disable');
				$('#modVersionselF').selectmenu('disable');
			}
		break;
		case "port":
			if($('#PortFilter').is(':checked')){	
				$('#portTypeselF').selectmenu('enable');
				$('#portNameselF').selectmenu('enable');
				$('#portMediaselF').selectmenu('enable');
				$('#portBandselF').selectmenu('enable');
			}else{
				$('#portTypeselF').selectmenu('disable');
				$('#portMediaselF').selectmenu('disable');
				$('#portNameselF').selectmenu('disable');
				$('#portBandselF').selectmenu('disable');
			}
		break;

	}

}
/*
 * 
 *  FUNCTION NAME : disableFilter
 *  AUTHOR        : James Turingan
 *  DATE          : December 18, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function disabledFilter(){
	$('#portTypeselF').selectmenu('disable');
	$('#portNameselF').selectmenu('disable');
	$('#portMediaselF').selectmenu('disable');
	$('#portBandselF').selectmenu('disable');
	$('#modProductselF').selectmenu('disable');
	$('#modNameselF').selectmenu('disable');
	$('#modVersionselF').selectmenu('disable');
	$('#lineProductselF').selectmenu('disable');
	$('#lineNameselF').selectmenu('disable');
	$('#lineVersionselF').selectmenu('disable');
	$('#embProductselF').selectmenu('disable');
	$('#embNameselF').selectmenu('disable');
	$('#embVersionselF').selectmenu('disable');
	$('#routeProductselF').selectmenu('disable');
	$('#routeNameselF').selectmenu('disable');
	$('#routeVersionselF').selectmenu('disable');
	$('#ProductselF').selectmenu('disable');
	$('#sysNameselF').selectmenu('disable');
	$('#VersionselF').selectmenu('disable');
	$('#OSselF').selectmenu('disable');
	$('#OSVersionselF').selectmenu('disable');
	$('#SWselF').selectmenu('disable');
}
/*
 * 
 *  FUNCTION NAME : initDynamicFilterValue
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */
var exstr = "";
if(globalDeviceType != "Mobile"){
	exstr = "config";
}

function initDynamicFilterValue(){
	var str = "<option value = 'Any' >Any</option>";
	var ostype ='';
	var osversion ='';
	var swpackage='';
	var systemsname='';
	var productId='';
	var vId='';
	var checkOS = [];	
	var checkOSVer = [];
	var checkSW = [];
	var checkSystem = [];
	var checkPiD = [];
	var checkVid = [];
	for(var i = 0; i < devicesFilter.length; i++){
		if(devicesFilter[i].OSType != "" && checkOS.indexOf(devicesFilter[i].OSType) == -1){
			checkOS.push(devicesFilter[i].OSType);
			ostype +="<option value='"+devicesFilter[i].OSType+"'>"+devicesFilter[i].OSType+"</option>";
		
		}
		if( devicesFilter[i].OSVersion != "" && checkOSVer.indexOf(devicesFilter[i].OSVersion) == -1){
			checkOSVer.push(devicesFilter[i].OSVersion);
			osversion +="<option value='"+devicesFilter[i].OSVersion+"'>"+devicesFilter[i].OSVersion+"</option>";
		}
		if(devicesFilter[i].SWPackage != "" && checkSW.indexOf(devicesFilter[i].SWPackage) == -1){
			checkSW.push(devicesFilter[i].SWPackage);
			swpackage +="<option value='"+devicesFilter[i].SWPackage+"'>"+devicesFilter[i].SWPackage+"</option>";
			
		}
		if(devicesFilter[i].SystemName != "" && checkSystem.indexOf(devicesFilter[i].SystemName) == -1){
			checkSystem.push(devicesFilter[i].SystemName);
			systemsname+="<option value='"+devicesFilter[i].SystemName+"'>"+devicesFilter[i].SystemName+"</option>";
			
		}
		if(devicesFilter[i].VersionId != "" && checkVid.indexOf(devicesFilter[i].VersionId) == -1){
			checkVid.push(devicesFilter[i].VersionId);
			vId+="<option value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";

		}
		if(devicesFilter[i].ProductId != "" && checkPiD.indexOf(devicesFilter[i].ProductId) == -1){
			checkPiD.push(devicesFilter[i].ProductId);
			productId+="<option value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";
			
		}

	}	
	$('#ProductselF'+exstr).empty().append(str+productId);
	$('#sysNameselF'+exstr).empty().append(str+systemsname);
	$('#VersionselF'+exstr).empty().append(str+vId);
	$('#OSselF'+exstr).empty().append(str+ostype);
	$('#OSVersionselF'+exstr).empty().append(str+osversion);
	$('#SWselF'+exstr).empty().append(str+swpackage);
	setTimeout(function(){
//		$("#ProductselF").trigger("create");
//		$("#sysNameselF").trigger("create");
//		$("#VersionselF").trigger("create");
//		$("#OSselF").trigger("create");
//		$("#OSVersionselF").trigger("create");
//		$("#SWselF").trigger("create");
	},500);

	PortFilterValue();
	LineCardValue();		
	RouteFilterValue();
	EmbeddedFilterValue();
	ModuleFilterValue()
}
/*
 * 
 *  FUNCTION NAME : EmbeddedFilterValue
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function EmbeddedFilterValue(){
	var str = "<option>Any</option>";
	var vId = '';
	var name = '';
	var pId = '';
	var checkvId = [];
	var checkName = [];
	var checkpId = [];
	for(var x = 0; x < devicesFilter.length; x++){
		for(var i = 0; i < devicesFilter[x].Embedded.length; i++){

			if(devicesFilter[x].Embedded[i].VersionId != "" && checkvId.indexOf(devicesFilter[x].Embedded[i].VersionId) == -1){
				checkvId.push(devicesFilter[x].Embedded[i].VersionId);
				vId +="<option value='"+devicesFilter[x].Embedded[i].VersionId+"'>"+devicesFilter[x].Embedded[i].VersionId+"</option>";
				
			}
			if(devicesFilter[x].Embedded[i].EmbeddedName != "" && checkName.indexOf(devicesFilter[x].Embedded[i].EmbeddedName) == -1){
				checkName.push(devicesFilter[x].Embedded[i].EmbeddedName);
				name +="<option value='"+devicesFilter[x].Embedded[i].EmbeddedName+"'>"+devicesFilter[x].Embedded[i].EmbeddedName+"</option>";
				
			}
			if(devicesFilter[x].Embedded[i].ProductId != "" && checkpId.indexOf(devicesFilter[x].Embedded[i].ProductId) == -1){
				checkpId.push(devicesFilter[x].Embedded[i].ProductId);
				pId +="<option value='"+devicesFilter[x].Embedded[i].ProductId+"'>"+devicesFilter[x].Embedded[i].ProductId+"</option>";
				
			}
		}
	}
	$('#modProductselF'+exstr).empty().append(str+pId);
	$('#modNameselF'+exstr).empty().append(str+name);
	$('#modVersionselF'+exstr).empty().append(str+vId);
	setTimeout(function(){
//		$("#modProductselF").trigger("create");
//		$("#modNameselF").trigger("create");
//		$("#modVersionselF").trigger("create");
	},500);
}

/*
 * 
 *  FUNCTION NAME : ModuleFilterValue
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function ModuleFilterValue(){
	var str = "<option>Any</option>";
	var vId = '';
	var name = '';
	var pId = '';
	var checkvId = [];
	var checkName = [];
	var checkpId = [];
	for(var x = 0; x < devicesFilter.length; x++){
		for(var i = 0; i < devicesFilter[x].Module.length; i++){
			if(devicesFilter[x].Module[i].VersionId != "" && checkvId.indexOf(devicesFilter[x].Module[i].VersionId) == -1){
				checkvId.push(devicesFilter[x].Module[i].VersionId);
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					vId +="<option value='"+devicesFilter[x].Module[i].VersionId+"'>"+devicesFilter[x].Module[i].VersionId+"</option>";
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && embname2.toLowerCase() == 'any' && embpId2.toLowerCase() == 'any' && embId2.toLowerCase() == 'any' ){
					vId +="<option value='"+devicesFilter[x].Module[i].VersionId+"'>"+devicesFilter[x].Module[i].VersionId+"</option>";
				}

				
			}
			if(devicesFilter[x].Module[i].ModuleName != "" && checkName.indexOf(devicesFilter[x].Module[i].ModuleName) == -1){
				checkName.push(devicesFilter[x].Module[i].ModuleName);
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					name +="<option value='"+devicesFilter[x].Module[i].ModuleName+"'>"+devicesFilter[x].Module[i].ModuleName+"</option>";
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && embname2.toLowerCase() == 'any' && embpId2.toLowerCase() == 'any' && embId2.toLowerCase() == 'any' ){
					name +="<option value='"+devicesFilter[x].Module[i].ModuleName+"'>"+devicesFilter[x].Module[i].ModuleName+"</option>";
				}
				
			}
			if(devicesFilter[x].Module[i].ProductId != "" && checkpId.indexOf(devicesFilter[x].Module[i].ProductId) == -1){
				checkpId.push(devicesFilter[x].Module[i].ProductId);
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					pId +="<option value='"+devicesFilter[x].Module[i].ProductId+"'>"+devicesFilter[x].Module[i].ProductId+"</option>";
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && embname2.toLowerCase() == 'any' && embpId2.toLowerCase() == 'any' && embId2.toLowerCase() == 'any' ){
					pId +="<option value='"+devicesFilter[x].Module[i].ProductId+"'>"+devicesFilter[x].Module[i].ProductId+"</option>";
				}

				
			}
		}
	}
	$('#modProductselF'+exstr).empty().append(str+pId);
	$('#modNameselF'+exstr).empty().append(str+name);
	$('#modVersionselF'+exstr).empty().append(str+vId);
	setTimeout(function(){
//		$("#modProductselF").trigger("create");
//		$("#modNameselF").trigger("create");
//		$("#modVersionselF").trigger("create");
	},500);
}

/*
 * 
 *  FUNCTION NAME : LineCardValue
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function LineCardValue(){
	var str = "<option>Any</option>";
	var vId = '';
	var name = '';
	var pId = '';
	var checkvId = [];
	var checkName = [];
	var checkpId = [];
	for(var x = 0; x < devicesFilter.length; x++){
		for(var i = 0; i < devicesFilter[x].LineCard.length; i++){

			if(devicesFilter[x].LineCard[i].LineCardVid != "" && checkvId.indexOf(devicesFilter[x].LineCard[i].LineCardVid) == -1){
				checkvId.push(devicesFilter[x].LineCard[i].LineCardVid);
				vId +="<option value='"+devicesFilter[x].LineCard[i].LineCardVid+"'>"+devicesFilter[x].LineCard[i].LineCardVid+"</option>";
				
			}
			if(devicesFilter[x].LineCard[i].Name != "" && checkName.indexOf(devicesFilter[x].LineCard[i].Name) == -1){
				checkName.push(devicesFilter[x].LineCard[i].Name);
				name +="<option value='"+devicesFilter[x].LineCard[i].Name+"'>"+devicesFilter[x].LineCard[i].Name+"</option>";
				
			}
			if(devicesFilter[x].LineCard[i].ProductId != "" && checkpId.indexOf(devicesFilter[x].LineCard[i].ProductId) == -1){
				checkpId.push(devicesFilter[x].LineCard[i].ProductId);
				pId +="<option value='"+devicesFilter[x].LineCard[i].ProductId+"'>"+devicesFilter[x].LineCard[i].ProductId+"</option>";
				
			}
		}
	}
	$('#lineProductselF'+exstr).empty().append(str+pId);
	$('#lineNameselF'+exstr).empty().append(str+name);
	$('#lineVersionselF'+exstr).empty().append(str+vId);
	setTimeout(function(){
//		$("#lineProductselF").trigger("create");
//		$("#lineNameselF").trigger("create");
//		$("#lineVersionselF").trigger("create");
	},500);
}
/*
 * 
 *  FUNCTION NAME : PortFilterValue
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function PortFilterValue(){
	var str = "<option>Any</option>";
	var speed = '';
	var name = '';
	var mediatype = '';
	var bandwidth = '';
	var checkbw = [];
	var checkName = [];
	var checkspeed = [];
	var checkMT = [];
	for(var x = 0; x < devicesFilter.length; x++){
		var sys = devicesFilter[x].SystemName;
		var pro = devicesFilter[x].ProductId;
		var vid = devicesFilter[x].VersionId;
		
		var osv = devicesFilter[x].OSVersion;
		var ost = devicesFilter[x].OSType;
		var swp = devicesFilter[x].SWPackage;
		
		for(var i = 0; i < devicesFilter[x].Port.length; i++){
			if(devicesFilter[x].Port[i].BandWidth != "" && checkbw.indexOf(devicesFilter[x].Port[i].BandWidth) == -1){
				checkbw.push(devicesFilter[x].Port[i].BandWidth);
				if(ostype2 == 'any' && osversion2 == 'any' && swpackage2 == 'any' && vId2 == 'any' && productId2 == 'any' && systemsname2 == 'any' ){
					bandwidth +="<option value='"+devicesFilter[x].Port[i].BandWidth+"'>"+devicesFilter[x].Port[i].BandWidth+"</option>";
				}
				if((sys == systemsname2 && portname == devicesFilter[x].Port[i].PortName) || (portname == devicesFilter[x].Port[i].PortName && ost == ostype2) || (portname == devicesFilter[x].Port[i].PortName && osversion2 == osv) || (portname == devicesFilter[x].Port[i].PortName && swpackage2 == swp) || ( portname == devicesFilter[x].Port[i].PortName && vid == vId2 ) || ( portname == devicesFilter[x].Port[i].PortName && pro == productId2)){
					bandwidth +="<option value='"+devicesFilter[x].Port[i].BandWidth+"'>"+devicesFilter[x].Port[i].BandWidth+"</option>";

				}
			}
			if(devicesFilter[x].Port[i].PortName != "" && checkName.indexOf(devicesFilter[x].Port[i].PortName) == -1){
				checkName.push(devicesFilter[x].Port[i].PortName);
				if(sys == systemsname2 || ost == ostype2 || osversion2 == osv || swpackage2 == swp || vid == vId2 || pro == productId2){
					name +="<option value='"+devicesFilter[x].Port[i].PortName+"'>"+devicesFilter[x].Port[i].PortName+"</option>";
				}
				if(ostype2 == 'any' && osversion2 == 'any' && swpackage2 == 'any' && vId2 == 'any' && productId2 == 'any' && systemsname2 == 'any' ){
					name +="<option value='"+devicesFilter[x].Port[i].PortName+"'>"+devicesFilter[x].Port[i].PortName+"</option>";
				}
				
			}
			if(devicesFilter[x].Port[i].Speed != "" && checkspeed.indexOf(devicesFilter[x].Port[i].Speed) == -1){
				checkspeed.push(devicesFilter[x].Port[i].Speed);
				speed +="<option value='"+devicesFilter[x].Port[i].Speed+"'>"+devicesFilter[x].Port[i].Speed+"</option>";
				
			}
			if(devicesFilter[x].Port[i].MediaType != "" && checkMT.indexOf(devicesFilter[x].Port[i].MediaType) == -1){
				checkMT.push(devicesFilter[x].Port[i].MediaType);
				mediatype +="<option value='"+devicesFilter[x].Port[i].MediaType+"'>"+devicesFilter[x].Port[i].MediaType+"</option>";
			}

		}
	}
	$('#portTypeselF'+exstr).empty().append(str+speed);
	$('#portNameselF'+exstr).empty().append(str+name);
	$('#portMediaselF'+exstr).empty().append(str+mediatype);
	$('#portBandselF'+exstr).empty().append(str+bandwidth);
	setTimeout(function(){
	//	$("#portTypeselF").trigger("create");
//		$("#portNameselF").trigger("create");
//		$("#portMediaselF").trigger("create");
//		$("#portBandselF").trigger("create");
	},500);
}
/*
 * 
 *  FUNCTION NAME : RouteFilterValue
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function RouteFilterValue(){
	var str = "<option>Any</option>";
	var routevId = '';
	var routename = '';
	var routepId = '';
	var routememo = '';
	var checkvId = [];
	var checkName = [];
	var checkpId = [];
	var checkMemory = [];
	for(var x = 0; x < devicesFilter.length; x++){
		for(var i = 0; i < devicesFilter[x].Route.length; i++){

			if(devicesFilter[x].Route[i].RouteName != undefined && devicesFilter[x].Route[i].RouteName != "" && checkName.indexOf(devicesFilter[x].Route[i].RouteName) == -1){
				checkName.push(devicesFilter[x].Route[i].RouteName);
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					routename +="<option value='"+devicesFilter[x].Route[i].RouteName+"'>"+devicesFilter[x].Route[i].RouteName.split(" ")[1]+"</option>";
				}else if(routepId2 == devicesFilter[x].Route[i].ProductId || routevId2 == devicesFilter[x].Route[i].VersionId){
					routename +="<option value='"+devicesFilter[x].Route[i].RouteName+"'>"+devicesFilter[x].Route[i].RouteName.split(" ")[1]+"</option>";
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && routename2.toLowerCase() == 'any' && routepId2.toLowerCase() == 'any' && routevId2.toLowerCase() == 'any' ){
					routename +="<option value='"+devicesFilter[x].Route[i].RouteName+"'>"+devicesFilter[x].Route[i].RouteName.split(" ")[1]+"</option>";
				}
			}
			if(devicesFilter[x].Route[i].VersionId != "" && checkvId.indexOf(devicesFilter[x].Route[i].VersionId) == -1){
				checkvId.push(devicesFilter[x].Route[i].VersionId);
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					routevId +="<option value='"+devicesFilter[x].Route[i].VersionId+"'>"+devicesFilter[x].Route[i].VersionId+"</option>";
				}else if(routepId2 == devicesFilter[x].Route[i].ProductId || routename2 == devicesFilter[x].Route[i].RouteName){
					routename +="<option value='"+devicesFilter[x].Route[i].RouteName+"'>"+devicesFilter[x].Route[i].RouteName.split(" ")[1]+"</option>";
					
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && routename2.toLowerCase() == 'any' && routepId2.toLowerCase() == 'any' && routevId2.toLowerCase() == 'any' ){
					routevId +="<option value='"+devicesFilter[x].Route[i].VersionId+"'>"+devicesFilter[x].Route[i].VersionId+"</option>";
				}

			}
			if(devicesFilter[x].Route[i].ProductId != "" && checkpId.indexOf(devicesFilter[x].Route[i].ProductId) == -1){
				checkpId.push(devicesFilter[x].Route[i].ProductId);
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					routepId +="<option value='"+devicesFilter[x].Route[i].ProductId+"'>"+devicesFilter[x].Route[i].ProductId+"</option>";
				}else if(routevId2 == devicesFilter[x].Route[i].VersionId || routename2 == devicesFilter[x].Route[i].RouteName){
					routename +="<option value='"+devicesFilter[x].Route[i].RouteName+"'>"+devicesFilter[x].Route[i].RouteName.split(" ")[1]+"</option>";
					
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && routename2.toLowerCase() == 'any' && routepId2.toLowerCase() == 'any' && routevId2.toLowerCase() == 'any' ){
					routepId +="<option value='"+devicesFilter[x].Route[i].ProductId+"'>"+devicesFilter[x].Route[i].ProductId+"</option>";
				}

				
			}
			if(devicesFilter[x].Route[i].Memory != "" && checkMemory.indexOf(devicesFilter[x].Route[i].Memory) == -1){
				checkMemory.push(devicesFilter[x].Route[i].Memory);
				routememo +="<option value='"+devicesFilter[x].Route[i].Memory+"'>"+devicesFilter[x].Route[i].Memory+"</option>";
			}

		}
	}
	$('#routeProductselF'+exstr).empty().append(str+routepId);
	$('#routeNameselF'+exstr).empty().append(str+routename);
	$('#routeVersionselF'+exstr).empty().append(str+routevId);
	setTimeout(function(){
//		$("#routeProductselF").trigger("create");
//		$("#routeNameselF").trigger("create");
//		$("#routeVersionselF").trigger("create");
	},500);
}

/*
 * 
 *  FUNCTION NAME : onChangeDropDownList
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */
	
function onChangeDropDownList(val,type){
	var str = "<option value = 'Any' >Any</option>";
	var ostype ='',osversion ='',swpackage='';
	var systemsname ='', productId ='', vId ='';
	var checkOS = [];	
	var checkOSVer = [];
	var checkSW = [];
	var checkSystem = [];
	var checkPiD = [];
	var checkVid = [];
	type = type.toLowerCase();
	for(var i = 0; i < devicesFilter.length; i++){
		// SOFTWARE
		if(devicesFilter[i].OSType != "" && checkOS.indexOf(devicesFilter[i].OSType) == -1){
			checkOS.push(devicesFilter[i].OSType);
			if(osversion2 == devicesFilter[i].OSVersion && type == 'software' || swpackage2 == devicesFilter[i].SWPackage && type == 'software'){
				if(devicesFilter[i].OSType == ostype2){
					ostype +="<option selected value='"+devicesFilter[i].OSType+"'>"+devicesFilter[i].OSType+"</option>";
				}else{
					ostype +="<option value='"+devicesFilter[i].OSType+"'>"+devicesFilter[i].OSType+"</option>";
				}

			}else if(osversion2.toLowerCase() == 'any' && ostype2.toLowerCase() == 'any' && swpackage2.toLowerCase() == 'any' ){
				ostype +="<option value='"+devicesFilter[i].OSType+"'>"+devicesFilter[i].OSType+"</option>";

			}	
		}
		if(devicesFilter[i].OSVersion != "" && checkOSVer.indexOf(devicesFilter[i].OSVersion) == -1){
			checkOSVer.push(devicesFilter[i].OSVersion);
			if(ostype2 == devicesFilter[i].OSType && type == 'software'){
				if(osversion2 == devicesFilter[i].OSVersion){
					osversion +="<option selected value='"+devicesFilter[i].OSVersion+"'>"+devicesFilter[i].OSVersion+"</option>";
				}else{
					osversion +="<option value='"+devicesFilter[i].OSVersion+"'>"+devicesFilter[i].OSVersion+"</option>";
				}
			}else if(swpackage2 == devicesFilter[i].SWPackage && type == 'software'){
				if(osversion2 == devicesFilter[i].OSVersion){
					osversion +="<option selected value='"+devicesFilter[i].OSVersion+"'>"+devicesFilter[i].OSVersion+"</option>";
				}else{
					osversion +="<option value='"+devicesFilter[i].OSVersion+"'>"+devicesFilter[i].OSVersion+"</option>";
				}
			}else if(osversion2.toLowerCase() == 'any' && ostype2.toLowerCase() == 'any' && swpackage2.toLowerCase() == 'any' ){
				osversion +="<option value='"+devicesFilter[i].OSVersion+"'>"+devicesFilter[i].OSVersion+"</option>";

			}	
		}
		if(devicesFilter[i].SWPackage != "" && checkSW.indexOf(devicesFilter[i].SWPackage) == -1){
			checkSW.push(devicesFilter[i].SWPackage);
			if(osversion2 == devicesFilter[i].OSVersion && type =='software' ){
				if(swpackage2 == devicesFilter[i].SWPackage){
					swpackage +="<option selected value='"+devicesFilter[i].SWPackage+"'>"+devicesFilter[i].SWPackage+"</option>";
				}else{
					swpackage +="<option value='"+devicesFilter[i].SWPackage+"'>"+devicesFilter[i].SWPackage+"</option>";

				}
			}else if(ostype2 == devicesFilter[i].OSType && type == 'software'){
				if(swpackage2 == devicesFilter[i].SWPackage){
					swpackage +="<option selected value='"+devicesFilter[i].SWPackage+"'>"+devicesFilter[i].SWPackage+"</option>";
				}else{
					swpackage +="<option value='"+devicesFilter[i].SWPackage+"'>"+devicesFilter[i].SWPackage+"</option>";

				}

			}else if(osversion2.toLowerCase() == 'any' && ostype2.toLowerCase() == 'any' && swpackage2.toLowerCase() == 'any' ){
				swpackage +="<option value='"+devicesFilter[i].SWPackage+"'>"+devicesFilter[i].SWPackage+"</option>";

			}	
			
		}
		// SYSTEM
		if(devicesFilter[i].SystemName != "" && checkSystem.indexOf(devicesFilter[i].SystemName) == -1){
			checkSystem.push(devicesFilter[i].SystemName);
			if(ostype2 == devicesFilter[i].OSType || osversion2 == devicesFilter[i].OSVersion || swpackage2 == devicesFilter[i].SWPackage){
				if(systemsname2 == devicesFilter[i].SystemName){
					systemsname+="<option selected value='"+devicesFilter[i].SystemName+"'>"+devicesFilter[i].SystemName+"</option>";
				}else{
					systemsname+="<option value='"+devicesFilter[i].SystemName+"'>"+devicesFilter[i].SystemName+"</option>";

				}

				
			}else if((productId2 == devicesFilter[i].ProductId && type == 'system') || (vId2 == devicesFilter[i].VersionId && type == 'system')){
				if(systemsname2 == devicesFilter[i].SystemName){
					systemsname+="<option selected value='"+devicesFilter[i].SystemName+"'>"+devicesFilter[i].SystemName+"</option>";
				}else{
					systemsname+="<option value='"+devicesFilter[i].SystemName+"'>"+devicesFilter[i].SystemName+"</option>";

				}
			}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && productId2.toLowerCase() == 'any' && vId2.toLowerCase() == 'any' && systemsname2.toLowerCase() == 'any'){
				
				systemsname+="<option value='"+devicesFilter[i].SystemName+"'>"+devicesFilter[i].SystemName+"</option>";
			}
			
		}
		if(checkVid.indexOf(devicesFilter[i].VersionId) == -1){
			checkVid.push(devicesFilter[i].VersionId);
			if(devicesFilter[i].VersionId == ""){
				vId+=" ";
			}
			if(ostype2 == devicesFilter[i].OSType || osversion2 == devicesFilter[i].OSVersion || swpackage2 == devicesFilter[i].SWPackage){	
				if(vId2 == devicesFilter[i].VersionId){
					vId+="<option  selected value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";
				}else{
					vId+="<option value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";

				}

			}else if(devicesFilter[i].VersionId != '' && productId2 == devicesFilter[i].ProductId && type == 'system'){
				if(vId2 == devicesFilter[i].VersionId){
					vId+="<option  selected value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";
				}else{
					vId+="<option value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";

				}
			}else if(systemsname2 == devicesFilter[i].SystemName && type == 'system' && devicesFilter[i].VersionId != ''){
				if(vId2 == devicesFilter[i].VersionId){
					vId+="<option  selected value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";
				}else{
					vId+="<option value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";

				}
			}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && productId2.toLowerCase() == 'any' && vId2.toLowerCase() == 'any' && systemsname2.toLowerCase() == 'any'){

				vId+="<option value='"+devicesFilter[i].VersionId+"'>"+devicesFilter[i].VersionId+"</option>";
			}
		}
		if(checkPiD.indexOf(devicesFilter[i].ProductId) == -1){
			checkPiD.push(devicesFilter[i].ProductId);
			if(devicesFilter[i].ProductId == ""){
				productId+=" ";
			}
			if(ostype2 == devicesFilter[i].OSType || osversion2 == devicesFilter[i].OSVersion || swpackage2 == devicesFilter[i].SWPackage){
				if(productId2 == devicesFilter[i].ProdutId){
					productId+="<option selected value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";
				}else{
					productId+="<option value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";

				}
	
			}else if(systemsname2 == devicesFilter[i].SystemName && type == 'system' && devicesFilter[i].ProductId != ""){
				if(productId2 == devicesFilter[i].ProdutId){
					productId+="<option selected value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";
				}else{
					productId+="<option value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";

				}
			}else if(vId2 == devicesFilter[i].VersionId && type == 'system' && devicesFilter[i].ProductId != ''){
				if(productId2 == devicesFilter[i].ProdutId){
					productId+="<option selected value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";
				}else{
					productId+="<option value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";

				}

			}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && productId2.toLowerCase() == 'any' && vId2.toLowerCase() == 'any' && systemsname2.toLowerCase() == 'any'){
				productId+="<option value='"+devicesFilter[i].ProductId+"'>"+devicesFilter[i].ProductId+"</option>";
			}
		}

	}	
	if(productId != ''){
		$('#ProductselF'+exstr).empty().append(str+productId);
	}
	if(systemsname != ''){
		$('#sysNameselF'+exstr).empty().append(str+systemsname);
	}
	if(vId != ''){
		$('#VersionselF'+exstr).empty().append(str+vId);
	}
	if(ostype != '' && type != ""){
		$('#OSselF'+exstr).empty().append(str+ostype);
	}
	if(osversion != ''){
		$('#OSVersionselF'+exstr).empty().append(str+osversion);
	}
	if(swpackage != ''){
		$('#SWselF'+exstr).empty().append(str+swpackage);
	}
	setTimeout(function(){
//		$("#ProductselF").trigger("create");
//		$("#sysNameselF").trigger("create");
//		$("#VersionselF").trigger("create");
//		$("#OSselF").trigger("create");
//		$("#OSVersionselF").trigger("create");
//		$("#SWselF").trigger("create");
	
	},500);
	RouteFilterValue();
	PortFilterValue();
	EmbeddedFilterValue();
	ModuleFilterValue();

}
/*
 * 
 *  FUNCTION NAME : EmbeddedFilterValue
 *  AUTHOR        : James Turingan
 *  DATE          : December 19, 2013
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */

function EmbeddedFilterValue(){
	var str = "<option>Any</option>";
	var embvId = '';
	var embname = '';
	var embpId = '';
	var checkvId = [];
	var checkName = [];
	var checkpId = [];
	for(var x = 0; x < devicesFilter.length; x++){
		for(var i = 0; i < devicesFilter[x].Embedded.length; i++){

			if(devicesFilter[x].Embedded[i].VersionId != "" && checkvId.indexOf(devicesFilter[x].Embedded[i].VersionId) == -1){
				checkvId.push(devicesFilter[x].Embedded[i].VersionId);

				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					embvId +="<option value='"+devicesFilter[x].Embedded[i].VersionId+"'>"+devicesFilter[x].Embedded[i].VersionId+"</option>";
				}else if(embname2 == devicesFilter[x].Embedded[i].EmbeddedName || embpId2 == devicesFilter[x].Embedded[i].ProductId){
					embvId +="<option value='"+devicesFilter[x].Embedded[i].VersionId+"'>"+devicesFilter[x].Embedded[i].VersionId+"</option>";
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && embname2.toLowerCase() == 'any' && embpId2.toLowerCase() == 'any' && embId2.toLowerCase() == 'any' ){
					embvId +="<option value='"+devicesFilter[x].Embedded[i].VersionId+"'>"+devicesFilter[x].Embedded[i].VersionId+"</option>";
				}

				
			}


			if(devicesFilter[x].Embedded[i].EmbeddedName != "" && checkName.indexOf(devicesFilter[x].Embedded[i].EmbeddedName) == -1){
				checkName.push(devicesFilter[x].Embedded[i].EmbeddedName);
				
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					embname +="<option value='"+devicesFilter[x].Embedded[i].EmbeddedName+"'>"+devicesFilter[x].Embedded[i].EmbeddedName+"</option>";
				}else if(embvId2 == devicesFilter[x].Embedded[i].VerisonId || embpId2 == devicesFilter[x].Embedded[i].ProductId){
					embname +="<option value='"+devicesFilter[x].Embedded[i].EmbeddedName+"'>"+devicesFilter[x].Embedded[i].EmbeddedName+"</option>";
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && embname2.toLowerCase() == 'any' && embpId2.toLowerCase() == 'any' && embId2.toLowerCase() == 'any' ){
					embname +="<option value='"+devicesFilter[x].Embedded[i].EmbeddedName+"'>"+devicesFilter[x].Embedded[i].EmbeddedName+"</option>";
				}

			}


			if(devicesFilter[x].Embedded[i].ProductId != "" && checkpId.indexOf(devicesFilter[x].Embedded[i].ProductId) == -1){
				checkpId.push(devicesFilter[x].Embedded[i].ProductId);
				if(ostype2 == devicesFilter[x].OSType || osversion2 == devicesFilter[x].OSVersion || swpackage2 == devicesFilter[x].SWPackage){
					embpId +="<option value='"+devicesFilter[x].Embedded[i].ProductId+"'>"+devicesFilter[x].Embedded[i].ProductId+"</option>";
				}else if(embvId2 == devicesFilter[x].Embedded[i].VerisonId || embname2 == devicesFilter[x].Embedded[i].EmbeddedName){
					embpId +="<option value='"+devicesFilter[x].Embedded[i].EmbeddedName+"'>"+devicesFilter[x].Embedded[i].EmbeddedName+"</option>";
				}else if(ostype2 == "" && osversion2 == "" && swpackage2 == "" && embname2.toLowerCase() == 'any' && embpId2.toLowerCase() == 'any' && embId2.toLowerCase() == 'any' ){
					embpId +="<option value='"+devicesFilter[x].Embedded[i].EmbeddedName+"'>"+devicesFilter[x].Embedded[i].EmbeddedName+"</option>";
				}
				
			}
		}
	}
	$('#embProductselF'+exstr).empty().append(str+embpId);
	$('#embNameselF'+exstr).empty().append(str+embname);
	$('#embVersionselF'+exstr).empty().append(str+embvId);
	setTimeout(function(){
	//	$("#modProductselF").trigger("create");
	//	$("#modNameselF").trigger("create");
	//	$("#modVersionselF").trigger("create");
	},500);


}
/*
 * 
 *  FUNCTION NAME : changePage
 *  AUTHOR        : James Turingan
 *  DATE          : February 18, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 * 
 */
function changePage(num){
	$("#configContent0").css("cursor","default");
    $("#Magnify").attr("title","Zoom");
	zoomButtonStatus = "inactive";
	createDev = '';
	addEvent2History("Change page to "+globalCurrPage); //add event to history
	for(var i = 0 ; i < 5; i++){
		if(num == i){
			$('#divPage-'+i).show('slide', {direction: 'left'}, 1000);
			$('#imgpage'+i).addClass('press');
		}else{
			if(i == 0){
				$('#divPage-'+i).hide();
			}else{
				$('#divPage-'+i).hide('slide', {direction: 'left'}, 1000);
			}
			$('#imgpage'+i).removeClass('press');
		}
	}
	if(globalCurrPage == "Config Editor"){
		$('.actionButton').show();
		$('.canvasNav').show();
		$('.divActionButton').show();
		$('.logout').show();

		$('#menuBtn').show();
		clearInterval(autoRefresh); 
	}else{		
		$('.canvasNav').hide();
		$('.divActionButton').hide();
		$('.userDisplay').show();
	}
}
/*
 * 
 *  FUNCTION NAME : EnableConFilter
 *  AUTHOR        : James Turingan
 *  DATE          : March 09, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : Enable or Disable the drop down menus in filter
 *  PARAMETERS    : 
 * 
 */

function EnableConFilter(){
	console.log('checccccccck');
	$('input:checkbox[name="filterCheck"]').each(function(){
		if($(this).is(":checked")){
			if($(this).attr('id') == 'systemFilter'){
				$('.osClass').removeAttr('disabled');
			}
			if($(this).attr('id') == 'systemFilter6'){
				$('.systemClass').removeAttr('disabled');
			}
			if($(this).attr('id') == 'RouteFilter'){
				$('.routeClass').removeAttr('disabled');
			}
			if($(this).attr('id') == 'EmbeddedFilter'){
				$('.embClass').removeAttr('disabled');
			}
			if($(this).attr('id') == 'LineFilter'){
				$('.lineClass').removeAttr('disabled');
			}
			if($(this).attr('id') == 'ModuleFilter'){
				$('.modClass').removeAttr('disabled');
			}
			if($(this).attr('id') == 'PortFilter'){
				$('.portClass').removeAttr('disabled');
			}
		}else{
			if($(this).attr('id') == 'systemFilter'){
				$('.osClass').attr('disabled',true);
				$('.osClass').val('Any');
			}
			if($(this).attr('id') == 'systemFilter6'){
				$('.systemClass').attr('disabled',true);
				$('.systemClass').val('Any');
			}
			if($(this).attr('id') == 'RouteFilter'){
				$('.routeClass').attr('disabled',true);
				$('.routeClass').val('Any');
			}
			if($(this).attr('id') == 'EmbeddedFilter'){
				$('.embClass').attr('disabled',true);
				$('.embClass').val('Any');
			}
			if($(this).attr('id') == 'LineFilter'){
				$('.lineClass').attr('disabled',true);
				$('.lineClass').val('Any');
			}
			if($(this).attr('id') == 'ModuleFilter'){
				$('.modClass').attr('disabled',true);
				$('.modClass').val('Any');
			}
			if($(this).attr('id') == 'PortFilter'){
				$('.portClass').attr('disabled',true);
				$('.portClass').val('Any');
			}
		}
	});

}
var routevId2 = "any";
var routename2 = "any";
var routepId2 = "any";

var embvId2 = "any";
var embname2 = "any";
var embpId2 = "any";

var modvId2 = "any";
var modname2 = "any";
var modpId2 = "any";

var linevId2 = "any";
var linename2 = "any";
var linepId2 = "any";


function getValFilter(type){
	$('.changeSelected').each(function(){
//SYSTEM
		if($(this).attr('id') == 'sysNameselFconfig'){
            systemsname2 = $(this).val();
        }
        if($(this).attr('id') == 'ProductselFconfig'){
            productId2 = $(this).val();
        }
        if($(this).attr('id') == 'VersionselFconfig'){
            vId2 =  $(this).val();
        }
//SOFTWARE
        if($(this).attr('id') == 'OSselFconfig'){
            ostype2 =  $(this).val();

        }
        if($(this).attr('id') == 'OSVersionselFconfig'){
            osversion2 =  $(this).val();
        }
        if($(this).attr('id') == 'SWselFconfig'){
            swpackage2 =  $(this).val();
        }
//ROUTE
        if($(this).attr('id') == 'routeNameselFconfig'){
			routename2 = $(this).val();
        }
        if($(this).attr('id') == 'routeProductselFconfig'){
            routepId2 =  $(this).val();
        }
        if($(this).attr('id') == 'routeVersionselFconfig'){
            routevId2 =  $(this).val();
        }
//EMBEDDED
        if($(this).attr('id') == 'embNameselFconfig'){
			embname2 = $(this).val();
        }
        if($(this).attr('id') == 'embProductselFconfig'){
            embpId2 =  $(this).val();
        }
        if($(this).attr('id') == 'embVersionselFconfig'){
            embvId2 =  $(this).val();
        }
//MOD
        if($(this).attr('id') == 'modNameselFconfig'){
			modname2 = $(this).val();
        }
        if($(this).attr('id') == 'modProductselFconfig'){
            modpId2 =  $(this).val();
        }
        if($(this).attr('id') == 'modVersionselFconfig'){
            modvId2 =  $(this).val();
        }



	});

	onChangeDropDownList('',type);
}
/*
 * 
 *  FUNCTION NAME : getDeviceObject
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get device object based on the device object path
 *  PARAMETERS    : devicePath 
 * 
 */
function getDeviceObject2(devicePath){
	var devices = [];
	var devObject;
	if(globalInfoType == "JSON"){
        devices = getDevicesNodeJSON();
    }else{
        devices =devicesArr;
    }
	for(var t=0; t<devices.length; t++){
		if(devices[t].ObjectPath == devicePath){
			devObject = devices[t];
			break;
		}
	}
	return devObject;
}
/*
 * 
 *  FUNCTION NAME : getPortObject
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get port object based on the port object path
 *  PARAMETERS    : portPath 
 * 
 */
function getPortObject2(portPath){
	var portObject;
	var prtArr = [];
	var pathArr = portPath.split(".");
	if(globalInfoType == "JSON"){
        prtArr = getAllPortOfDevice(pathArr[0]);
    }else{
        prtArr= portArr;
    }
	for(var t=0; t<prtArr.length; t++){
		if(prtArr[t].ObjectPath == portPath){
			portObject = prtArr[t];
			break;
		}
	}
	return portObject;
}
/*
 * 
 *  FUNCTION NAME : getPortDevice
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : get port oof device
 *  PARAMETERS    : devicePath 
 * 
 */
function getPortDevice(devicePath){
	var prtArr = [];
	var pathArr = portPath.split(".");
	if(globalInfoType == "JSON"){
        prtArr = getAllPortOfDevice(pathArr[0]);
    }else{
        prtArr= portArr;
    }
	var myArr = [];
	for(var t=0; t<prtArr.length; t++){
		var pathArr = prtArr[t].ObjectPath.split(".");
		if(pathArr[0] == devicePath){
			myArr.push(prtArr[t]);
		}	
	}
	return myArr;
}
/*
 * 
 *  FUNCTION NAME : setPortFlagToTrue
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 8, 2014
 *  MODIFIED BY   :
 *  REVISION DATE :
 *  REVISION #    :
 *  DESCRIPTION   : set port flag to true
 *  PARAMETERS    : devicePath 
 * 
 */
function setPortFlagToTrue(dstPath,scrPath){
	var prtArr = [];
	if(globalInfoType == "JSON"){
		var pathArr = dstPath.split(".");
		var pathArr2 = scrPath.split(".");
		var json1 = getAllPortOfDevice(pathArr[0]);
        var json2 = getAllPortOfDevice(pathArr2[0]);
        var prtArr = json1.concat(json2);
    }else{
        prtArr= portArr;
    }
	for(var t=0; t<prtArr.length; t++){
		if(dstPath == prtArr[t].ObjectPath || scrPath == prtArr[t].ObjectPath){
			prtArr[t].PortFlag = "true";
		}	
	}
}
/*
 *
 *  FUNCTION NAME : menuTbl 
 *  AUTHOR        : Mark Elbambo
 *  DATE          : March 9, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show sidebar sub menu
 *  PARAMETERS    : 
 *
 */
function menuTbl(tblId,back,first,next,last){
	var len = $('#'+tblId+' > tbody >  tr').length - 1;
	$('#'+tblId+' > tbody >  tr').each(function(index) {
        if($(this).is(':visible')){
            if(index == 0){ //&& globalDeviceType != "Mobile"){
				$('#'+next).show();
				$('#'+last).show();
				$('#'+back).hide();
				$('#'+first).hide();
				return;
            }
            if(index == 1){
//				if(globalDeviceType == "Mobile"){
//					return;
//				}else{
					$('#'+next).show();
					$('#'+last).show();
					$('#'+back).hide();
					$('#'+first).hide();
//				}
			}else if(index == 2 && globalDeviceType == "Mobile"){
                $("#"+tblId).prev().find("img").hide();
            }

            if(index != 0){
               if($(this).prev().html() != "" && $(this).prev().html() != undefined){
					$(this).hide();
					$(this).prev().show();
					if(globalDeviceType == "Mobile"){
						var lev = $(this).prev().attr("level");
                        $("#"+tblId+"Title").html(lev);
					}
					if(($(this).prev().attr('id') == "connectivityPaletteSubTrMain" || $(this).prev().attr('id') == "devicePaletteSubTrMain" || $(this).prev().attr('id') == "testToolPaletteSubTrMain" || $(this).prev().attr('id') == undefined)){ //&& globalDeviceType != "Mobile"){
						$('#'+next).show();
						$('#'+last).show();
						$('#'+back).hide();
						$('#'+first).hide();
		  			}else {//if(globalDeviceType != "Mobile"){
						$('#'+next).show();
						$('#'+last).show();
						$('#'+back).show();
						$('#'+first).show();
					}
					return false;
               }else if($(this).prev().prev().html() != "" && $(this).prev().prev().html() != undefined){
					$(this).hide();
					$(this).prev().prev().show();
					if(globalDeviceType == "Mobile"){
						var lev = $(this).prev().prev().attr("level");
                        $("#"+tblId+"Title").html(lev);
					}
					if(($(this).prev().prev().attr('id') == "connectivityPaletteSubTrMain" || $(this).prev().prev().attr('id') == "devicePaletteSubTrMain" || $(this).prev().prev().attr('id') == "testToolPaletteSubTrMain" || $(this).prev().prev().attr('id') == undefined)){// && globalDeviceType != "Mobile"){
						$('#'+next).show();
						$('#'+last).show();
						$('#'+back).hide();
						$('#'+first).hide();
		  			}else {//if(globalDeviceType != "Mobile"){
						$('#'+next).show();
						$('#'+last).show();
						$('#'+back).show();
						$('#'+first).show();
					}
					return false;
              }
          }
      }
   });
}
/*
 *
 *  FUNCTION NAME : menuTblNext 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 12, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show sidebar sub menu
 *  PARAMETERS    : 
 *
 */
function menuTblNext(tblId,back,first,next,last){
	var len = $('#'+tblId+' > tbody >  tr').length -1;
	$('#'+tblId+' > tbody >  tr').each(function(index) {
        if($(this).is(':visible')){
            if(index == 0){ //&& globalDeviceType != "Mobile"){
				$('#'+back).hide();
				$('#'+first).hide();
            }
            if(index == 1){
//				if(globalDeviceType == "Mobile"){
//					return;
//				}else{
					$('#'+back).hide();
					$('#'+first).hide();
//				}
            }
            if($(this).next().html() != "" && $(this).next().html() != undefined){
				$(this).hide();
				$(this).next().show();
				if(globalDeviceType == "Mobile"){
					var lev = $(this).next().attr("level");
                    $("#"+tblId+"Title").html(lev);
				}
				if(((($(this).next().attr('id') == "connectivityPaletteSubTrL1" || $(this).next().attr('id') == "connectivityPaletteSubTrL2")
				&& ($(this).next().next().html() == "" || $(this).next().next().html() == undefined)) 
				|| $(this).next().attr('id') == "connectivityPaletteSubTrL1Sub"  || $(this).next().attr('id') == "connectivityPaletteSubTrL2Sub"
				|| $(this).next().attr('id') == "devicePaletteSubTrHostname" || $(this).next().attr('id') == "testToolPaletteSubTrIPAdd" 
				|| $(this).next().attr('id') == "connectivityPaletteSubTrL2Sub" || $(this).next().attr('id') == "connectivityPaletteSubTrL1Sub" 
				|| $(this).next().attr('id') == undefined)){// && globalDeviceType != "Mobile"){
					$('#'+next).hide();
					$('#'+last).hide();
					$('#'+back).show();
					$('#'+first).show();
				}else{// if(globalDeviceType != "Mobile"){
					$('#'+next).show();
					$('#'+last).show();
					$('#'+back).show();
					$('#'+first).show();
				}
				return false;
            }else if($(this).next().next().html() != "" && $(this).next().next().html() != undefined){
				$(this).hide();
				$(this).next().next().show();
				if(globalDeviceType == "Mobile"){
					var lev = $(this).next().next().attr("level");
                    $("#"+tblId+"Title").html(lev);
				}
				if(((($(this).next().attr('id') == "connectivityPaletteSubTrL1" || $(this).next().attr('id') == "connectivityPaletteSubTrL2")
				&& ($(this).next().next().html() == "" || $(this).next().next().html() == undefined)) 
				|| $(this).next().attr('id') == "connectivityPaletteSubTrL1Sub"  || $(this).next().attr('id') == "connectivityPaletteSubTrL2Sub"
				|| $(this).next().attr('id') == "devicePaletteSubTrHostname" || $(this).next().attr('id') == "testToolPaletteSubTrIPAdd" 
				|| $(this).next().attr('id') == "connectivityPaletteSubTrL2Sub" || $(this).next().attr('id') == "connectivityPaletteSubTrL1Sub" 
				|| $(this).next().attr('id') == undefined)){// && globalDeviceType != "Mobile"){
					$('#'+next).hide();
					$('#'+last).hide();
					$('#'+back).hide();
					$('#'+first).hide();
				}else{// if(globalDeviceType != "Mobile"){
					$('#'+next).show();
					$('#'+last).show();
					$('#'+back).show();
					$('#'+first).show();
				}
				return false;
            }
      	}
   });
}

/*
 *
 *  FUNCTION NAME : menuTblFirst 
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : March 27, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show first submenu 
 *  PARAMETERS    : 
 *
 */
function menuTblFirst(tblId,back,first,next,last){
	var len = $('#'+tblId+' > tbody >  tr').length - 1;
	$('#'+tblId+' > tbody >  tr').each(function(index) {
		$(this).hide();
        if(index == 1){
			$(this).show();
			$('#'+next).show();
			$('#'+last).show();
			$('#'+back).hide();
			$('#'+first).hide();
			if(globalDeviceType == "Mobile"){
				var lev = $(this).attr("level");
                $("#"+tblId+"Title").html(lev);
			}
        }else{
			$(this).hide();
		}
   });
}
/*
 *
 *  FUNCTION NAME : menuTblLast 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 22, 2014 
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : show last submenu 
 *  PARAMETERS    : 
 *
 */
function menuTblLast(tblId,back,first,next,last){
	var len = $('#'+tblId+' > tbody >  tr').length - 1;
	$('#'+tblId+' > tbody >  tr').each(function(index) {
        $(this).hide();
        if(index == len){
			$('#'+next).hide();
            $('#'+last).hide();
            $('#'+back).show();
            $('#'+first).show();
            $(this).show();
            if(globalDeviceType == "Mobile"){
                var lev = $(this).attr("level");
                $("#"+tblId+"Title").html(lev);
            }
        }else{
            $(this).hide();
        }
   });
}

/*
 *
 *  FUNCTION NAME : ajaxLoader 
 *  AUTHOR        : James Turingan
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : 
 *  PARAMETERS    : 
 *
 */

function ajaxLoader(type,label){
	if(type == 'show'){
		var msg = "<center><div  style='text-align:center;z-index:150;position:absolute;left:45%;top:50%;'>"+label+"<br /><img src='img/ajax-loader.gif'/></div></center>" ;
		$( "#msg" ).remove();
		 $("body").append("<center><div style='width:"+width+"px; height:"+height+"px;' id='msg' style='' class='label'>"+msg+"<div class='ui-widget-overlay ui-front' ></div></div></center>");
	}else{
		$('#msg').remove();	
	}

}

/*
 *
 *  FUNCTION NAME : gettargetmap 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get target map for single device 
 *  PARAMETERS    : device,myarray
 *
 */
function gettargetmap(device,myarray){
	var portarr = [];
	var nameArr = [];
	for(var t=0; t<myarray.length; t++){
		nameArr.push(myarray[t].Name);
	}
	portarr = getAllPortOfDevice(device,portarr);
	for(var t=0; t<portarr.length; t++){
		if(portarr[t].PORTMAP != null && portarr[t].PORTMAP != undefined && portarr[t].PORTMAP.length != 0){
			var name = portarr[t].PORTMAP[0].Name;
			if ($.inArray(name,nameArr) == -1) {
				nameArr.push(name);
                myarray.push(portarr[t].PORTMAP[0]);
            }
		}	
	}
	return myarray;
}
/*
 *
 *  FUNCTION NAME : getalldevicepath 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get all device path in canvas 
 *  PARAMETERS    : myarray
 *
 */
function getalldevicepath(myarray){
	if(globalInfoType == "JSON"){
        var devices = getDevicesNodeJSON();
    }else{
         var devices =devicesArr;
    }
	for(var t=0; t<devices.length; t++){
		if(devices[t].ObjectPath != "" && devices[t].ObjectPath != null && devices[t].ObjectPath != undefined){
			if ($.inArray(devices[t].ObjectPath,myarray) == -1) {
				myarray.push(devices[t].ObjectPath);
			}
		}
	}
	return myarray;
}
/*
 *
 *  FUNCTION NAME : getAllServerAndDut 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get all devices with Dut and Server type
 *  PARAMETERS    : device
 *
 */
function getAllServerAndDutCommitted(device){
	var myArray = new Array();
	var myArrayName = new Array();
	for(var t=0; t<device.length; t++){
		if((device[t].DeviceType == "Dut" || device[t].DeviceType == "Server")
		&& ((device[t].UpdateFlag != "new" && device[t].UpdateFlag != "deleted")
		|| device[t].Status == "Reserved")){
			var name = device[t].DeviceName;
			if ($.inArray(name,myArrayName) == -1) {
				myArrayName.push(name);
				myArray.push(device[t]);
			}
		}
	}
	return myArray;
}

/*
 *
 *  FUNCTION NAME : checkArray 
 *  AUTHOR        : Juvindle C Tina
 *  DATE          : March 26, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : check value if is already exist on the array
 *  PARAMETERS    : device
 *
 */
function checkArray(device,myArray){
	var flag = false;
	for(var t=0; t<myArray.length; t++){
		if(myArray[t] == device){
			flag = true;
			break;
		}
	}
	return flag;
}

