 /*
 *  FUNCTION NAME : setJSONData
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating MAINCONFIG node
 *  PARAMETERS    : 
 *
 */
function setJSONData(){
    DomainName = $("#resDomSelect").val();
	window['variable' + dynamicDomain[pageCanvas] ] = DomainName;
    ZoneName = 'Default';
	var JsonStr ='';
	JsonStr += '{"MAINCONFIG": ['+'{ "ConfUserName":"","URLConfigFlag":"false","ConfInfraHandlers":"","TftpServerPath":"","JobScriptFile":"","RedFlag":"","ZoneName":"'+ZoneName+'","JobScriptPath":"","TBPasswordEnable":"",';
	JsonStr += '"xmlFileName":"","LinkSanityEnable":"","TBPasswordLine":"","JobOption":"","PortMappingEnable":"","DevListCtr":"'+DevListCtr+'","DndCtr":"'+DndCtr+'","TBPasswordTacacs":"","ImageConfigurationEnable":"",';
	JsonStr += '"TftpImageName":"","TestbedName":"","AccessSanity":"'+AccessSanity+'","TGENConfigurationEnable":"","TBPasswordSecret":"","Name":"'+Name+'","TftpImagePath":"","DeviceSanity":"'+DeviceSanity+'",';
	JsonStr += '"Interval":"'+Interval+'",	"DefaultGateway":"", "ConfAdminPassword":"", "ConfMapdir":"", "DateTIME":"'+DateTime+'", "NetbootVlan":"", "DomainName":"'+DomainName+'", "TopologyName":"'+TopologyName+'",';
	JsonStr += '"DeviceConfigurationEnable":"", "ConfAutoPath":"", "TftpServerRoot":"", "ResourceOrig":"'+ResourceOrig+'","TftpIpAddress":"", "ConfAdminUsername":"", "DevListFlag":"'+DevListFlag+'","Iteration":"'+Iteration+'",';
	JsonStr += '"TftpServerAddress":"", "ReservationType":"'+ReservationType+'", "ConfPassword":"", "Connectivity":"'+Connectivity+'", "CommitEnable":"'+CommitEnable+'","MainId":"'+window['variable' + dynamicMainId[pageCanvas] ]+'",';
	JsonStr += '"DebugMode":"'+window['variable' + dynamicDebug[pageCanvas] ]+'","MainConfigurationUserId":"'+globalUserId+'","ResourceId":"'+window['variable' + dynamicResourceId[pageCanvas] ]+'","SetNewValues":"","FileType":"'+FileType+'","TftpServerName":"","URLImageFlag":"false",';
	JsonStr += '"SaveImageEnable":"","SaveConfigEnable":"","LoadConfigEnable":"","LoadImageEnable":"",';
	JsonStr += '"UserName":"'+globalUserName+'", "Flag":"1", "Offset":"'+Offset+'", "DST":"'+DST+'","PageCanvas":"'+pageCanvas+'","EnableInterface":"'+false+'", "DEVICES":[] }]}';
	if(globalMAINCONFIG.length == 0){
		globalMAINCONFIG.push($.parseJSON(JsonStr));
	}else{
		var ctr =0;
		for(var a=0; a< globalMAINCONFIG.length;a++){
			if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
				ctr++;
			}
		}
		if(ctr == 0){
			globalMAINCONFIG.push($.parseJSON(JsonStr));
		}
	}
}

/*
 *  FUNCTION NAME : modifyMainConfigJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : March 19, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For updating MAINCONFIG node
 *  PARAMETERS    : 
 *
 */
function modifyMainConfigJSON(){
	for(var a=0; a< globalMAINCONFIG.length;a++){
		if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
			globalMAINCONFIG[a].MAINCONFIG[0].DebugMode = window['variable' + dynamicDebug[pageCanvas] ];
			globalMAINCONFIG[a].MAINCONFIG[0].ResourceId = window['variable' + dynamicResourceId[pageCanvas] ].toString();
    	}
	}
}

 /*
 *  FUNCTION NAME : setDevicesInformationJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating DEVICEs node
 *  PARAMETERS    : 
 *
 */
function setDevicesInformationJSON(devname,devtype,devpath,model,dndmodel,softver,osver,ostype,softpack,reeval,ipadd,devid,hostname,update,media,portname,mgntip,mgntip2,aux,disflag,exclusive,xpos,ypos,powerstats,power,tftpip,itftphost,tftpimgpath,tftpimgname,tftpuser,tftppass,itftpadd,tacacsip,tacacshost,radiusname,rdiusip,radius,radiuspass,desc,processor,processorboardid,manu,serialnum,ios,cpuspeed,sysmem,nvramcp,procmem,condone,reachdone,converdone,tftpserver,tuser,tpass,ftpserver,ftpuser,ftppass,configdetail,configfilepath,configfilename,configurl,saveconurl,configserver,configdest,imagefilepath,imagedetail,imagefilename,imageurl,saveimageurl,imageserver,iamgedest,saveimageen,saveconfigen,loadconfigen,loadimageen,saveimagedetail,saveimageserver,saveimagedest,saveimageuser,saveimagepass,saveimagetype,saveconfigdetail,saveconfigserver,saveconfigdest,saveconfiguser,saveconfigpass,saveconfigtype,saveconfigfilename,saveimagefilename,sysimagename,systemconname,savetypeimage,typeimage,savetypeconfig,typeconfig,chassispid,chassisvid,routename,totalmemory,totalmemory2,routename2,routeredundant,routedesc,routeprodid,routeprodid2,routeverid,rputeverid2,embedredundant,embedname,embedname2,embeddesc,embedproid,embedproid2,embedverid,embedverid2,embednitrox,embedocteon,embednotrox2,embedocteon2,linename,linedesc,lineproid,lineverid,linenum,modname,moddesc,modproid,modverid,profam,servertype,mgntint,mgntint2,mgntmask,mgntmask2,mgntipv6,mgntipv62,mgntipv5pref,mgntipv6pref2,protype,cpucore,prosock,corespersock,logpro,conip,titanname,profam,propid,connet,ipv6,key,admin,access,account,accountport,authendir,authenport,behost,configmethod,configname,configfile,configpath,cleartype,coaport,com,connectivity,dbname,dbtablename,dbtype,defaultsm,devlist,extip,enpass,features,func,logdir,nrcmd,nrcmduser,port,redirport,redirlogport,rootdir,serverdir,ventype,snapshot,domname,application,sequence,rp0con,rp1con,src,portarr, stats,conflag){
	var JsonStr = '';
	JsonStr += '{ "DeviceName":"'+devname+'","DeviceType":"'+devtype+'","ObjectPath":"'+devpath+'","Model":"'+model+'","DNDModelType":"'+dndmodel+'","SoftwareVersion":"'+softver+'","OSVersion":"'+osver;
	JsonStr += '","OSType":"'+ostype+'","SoftwarePackage":"'+softpack+'",	"IpAddress":"'+ipadd+'","HostName":"'+hostname+'","UpdateFlag":"'+update+'", "MediaType":"'+media+'","Portname":"'+portname+'",	"ManagementIp":"'+mgntip;
	JsonStr += '","ManagementIp2":"'+mgntip2+'", "Auxiliary":"'+aux+'","DiscoveryFlag":"'+disflag+'","Exclusivity":"'+exclusive+'","XLocation":"'+parseInt(xpos)+'","YLocation":"'+parseInt(ypos)+'","PowerStatus":"'+powerstats;
	JsonStr += '","TftpIpAddress":"'+tftpip+'","TftpHostname":"'+itftphost+'","TftpImagePath":"'+tftpimgpath+'","TftpImageName":"'+tftpimgname+'","TftpUser":"'+tftpuser+'","TftpPassword":"'+tftppass+'","TftpAddress":"'+itftpadd;
	JsonStr += '","TacacsIpAddress":"'+tacacsip+'","TacacsHostname":"'+tacacshost+'","RadiusHostname":"'+radiusname+'","RadiusIpAddress":"'+rdiusip+'","RadiusUsername":"'+radius+'","RadiusPassword":"'+radiuspass;
	JsonStr += '","Manufacturer":"'+manu+'","SerialNumber":"'+serialnum+'","SystemMemory":"'+sysmem+'",	"NVRAMCF":"'+nvramcp+'","ConfigDetail":"'+configdetail+'","ConfigFilePath":"'+configfilepath;
	JsonStr += '","ConfigFileName":"'+configfilename+'","ConfigUrl":"'+configurl+'","SaveConfigUrl":"'+saveconurl+'",	"ConfigServer":"'+configserver+'","ConfigDestination":"'+configdest+'",	"ImageFilePath":"'+imagefilepath;
	JsonStr += '","ImageDetail":"'+imagedetail+'","ImageFileName":"'+imagefilename+'","ImageUrl":"'+imageurl+'","SaveImageUrl":"'+saveimageurl+'","ImageServer":"'+imageserver+'","ImageDestination":"'+iamgedest;
	JsonStr += '","SaveImageDetail":"'+saveimagedetail;
	JsonStr += '","SaveImageServer":"'+saveimageserver+'","SaveImageDestination":"'+saveimagedest+'",	"SaveImageUser":"'+saveimageuser+'","SaveImagePassword":"'+saveimagepass+'","SaveImageType":"'+saveimagetype;
	JsonStr += '","SaveConfigDetail":"'+saveconfigdetail+'","SaveConfigServer":"'+saveconfigserver+'","SaveConfigDestination":"'+saveconfigdest+'","SaveConfigUser":"'+saveconfiguser+'","SaveConfigPassword":"'+saveconfigpass;
	JsonStr += '","SaveConfigType":"'+saveconfigtype+'","SaveConfigFileName":"'+saveconfigfilename+'","SaveImageFileName":"'+saveimagefilename+'","SystemImageName":"'+sysimagename+'","SystemConfigName":"'+sysimagename;
	JsonStr += '","SaveTypeImage":"'+savetypeimage+'","TypeImage":"'+typeimage+'","SaveTypeConfig":"'+savetypeconfig+'",	"TypeConfig":"'+typeconfig+'","ChassisPid":"'+chassispid+'","ChassisVid":"'+chassisvid;
	JsonStr += '","RouteProcessorName":"'+routename+'","TotalMemory":"'+totalmemory+'","TotalMemory2":"'+totalmemory2+'","RouteProcessorName2":"'+routename2+'","RouteRedundant":"'+routeredundant;
	JsonStr += '","RouteProcessorProductId":"'+routeprodid+'","RouteProcessorVersionId":"'+routeverid+'","EmbeddedRedundant":"'+embedredundant+'","EmbeddedProcessorName":"'+embedname+'","EmbeddedProcessorName2":"'+embedname2;
	JsonStr += '","EmbeddedProcessorProductId":"'+embedproid+'","EmbeddedProcessorProductId2":"'+embedproid2+'","EmbeddedProcessorVersionId":"'+embedverid+'","EmbeddedProcessorVersionId2":"'+embedverid2;
	JsonStr += '","EmbeddedProcessorNitrox":"'+embednitrox+'","EmbeddedProcessorOcteon":"'+embedocteon+'","EmbeddedProcessorNitrox2":"'+embednotrox2+'","EmbeddedProcessorOcteon2":"'+embedocteon2+'","LineCardName":"'+linename;
	JsonStr += '","LineCardDescription":"'+linedesc+'",	"LineCardProductId":"'+lineproid+'","LineCardVersionId":"'+lineverid+'","LineCardNumber":"'+linenum+'","ModuleName":"'+modname+'","ModuleDescription":"'+moddesc;
	JsonStr += '","ModuleProductId":"'+modproid+'","ModuleVersionId":"'+modverid+'","ProductFamily":"'+profam+'","ServerType":"'+servertype+'","ManagementInterface":"'+mgntint+'","ManagementInterface2":"'+mgntint2;
	JsonStr += '","ManagementIpMask":"'+mgntmask+'","ManagementIpMask2":"'+mgntmask2+'","ManagementIpv6":"'+mgntipv6+'","ManagementIpv62":"'+mgntipv62+'","ManagementIpv6Prefix":"'+mgntipv5pref+'","ManagementIpv6Prefix2":"'+mgntipv6pref2;
	JsonStr += '","ManagementGatewayIp":"","Status":"'+stats+'",';
	JsonStr += '"ProcessorType":"'+protype+'","CPUCores":"'+cpucore+'","ProcessorSockets":"'+prosock+'","CoresPerSocket":"'+corespersock+'","LogicalProcessor":"'+logpro+'","ConsoleIp":"'+conip+'",	"AuthenticationDirectory":"'+authendir+'","AuthenticationPort":"'+authenport+'",	"BEHostlist":"'+behost+'","ConfigMethod":"'+configmethod+'","ConfigName":"'+configname+'","ConfigFile":"'+configfile+'","ConfigPath":"'+configpath+'","ClearType":"'+cleartype+'","COAPort":"'+coaport+'",	"Community":"'+com+'","Connectivity":"'+connectivity+'","DatabaseName":"'+dbname+'","DatabaseTableName":"'+dbtablename+'","DatabaseType":"'+dbtype+'","DefaultSM":"'+defaultsm+'","DeviceList":"'+devlist+'","ExtensionIp":"'+extip+'","EnablePassword":"'+enpass+'","Features":"'+features+'","Function":"'+func+'","LogDirectory":"'+logdir+'","NRCMD":"'+nrcmd+'","NRCMDUsername":"'+nrcmduser+'","Port":"'+port+'","RedirectPort":"'+redirport+'","RedirectLogPort":"'+redirlogport+'","RootDirectory":"'+rootdir+'","ServerDirectory":"'+serverdir+'","VendorType":"'+ventype+'","Snapshot":"'+snapshot+'","DomainName":"'+domname+'","Application":"'+application+'","Sequence":"'+sequence+'","RP0ConsoleIp":"'+rp0con+'","RP1ConsoleIp":"'+rp1con+'","Page":"'+pageCanvas+'",';
	JsonStr += '"ConfLr":"","ConfPreEna":"","ConfPreIosHfr":"","ConfPagentKey":"","MgmtPostIosEna":"","MgmtPostEna":"","MgmtPostModel":"","MgmtPostIosClassic":"","MgmtPostMc":"","MgmtPostHfr":"","MgmtPreIosClassic":"","MgmtPreIosEna":"","MgmtPreIosHfr":"","TBPCInfo":"","TftpServerIp":"","MgmtPreEna":"","ConfRPLoadTime":"","ConfBootDevice":"","ConfPieLoadTime":"","ConfRedTimeout":"","ConfEasyBake":"","ConfDebugDisk":"","TBPowerCycler":"","ConfDebugPath":"","DEVICE":[],"SLOT":[] }';
	var parseJ = $.parseJSON(JsonStr);
	if(globalMAINCONFIG.length > 0){
		for(var a=0; a< globalMAINCONFIG.length;a++){
			if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
   			    var ctr =0;
       			for(var b=0; b< globalMAINCONFIG[a].MAINCONFIG[0].DEVICES.length;b++){
        		    if(globalMAINCONFIG[a].MAINCONFIG[0].DEVICES[b].ObjectPath == devpath){
   	        		    ctr++;
        	    	}
		        }
	    	    if(ctr == 0){
   		    	    globalMAINCONFIG[a].MAINCONFIG[0].DEVICES.push(parseJ);
    	    	}
			}
		}
	}
}

 /*
 *  FUNCTION NAME : setDevicesChildInformationJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating DEVICE node
 *  PARAMETERS    : 
 *
 */
function setDevicesChildInformationJSON(chassis,loop,user,esxi,pass,esxipass,objpath,stats,devicename,devname,deviceid,red,model,dndmodel,devtype,deviceresid,macadd,deviceflag,host,update,media,portname,dbresid,contype,portspeed,portband,exactname,loadflag,portview,discover,routepro,embedpro,linecard,exactip,power,application,protoflag,switchport,mapname,control){
	if(control =="undefined" || control == undefined){
        control = '';
    }
    if(protoflag == ""){
        protoflag = false;
    }
    if(update == "" || update ==undefined){
        update = "new";
    }
	var JsonStr = '';
	JsonStr += '{"ProtoTypeFlag":"'+protoflag+'","LoadFlag":"'+loadflag+'","PieEnable":"","PortView":"'+portview+'","Application":"'+application+'","Discovery":"'+discover+'","LoopBackAddress":"'+loop+'",';
	JsonStr += '"MacAddress":"'+macadd+'","RouteProcessor":"'+routepro+'","ControllerInfo":"'+control+'","TagEna":"","TagMC":"","TagClassic":"","ObjectPath":"'+objpath+'","PortSpeed":"'+portspeed+'","Status":"'+stats+'",';
	JsonStr += '"ESXIPassword":"'+esxipass+'","Breakout":"","PortBandWidth":"'+portband+'","MapName":"'+mapname+'","DeviceName":"'+devicename+'","ESXIUsername":"'+esxi+'","Username":"'+user+'","DevName":"'+devname+'",';
	JsonStr += '"DeviceFlag":"'+deviceflag+'","TagHfr":"","ConnectivityType":"'+contype+'","TagType":"","DNDModelType":"'+dndmodel+'","Password":"'+pass+'","ExactHostName":"'+exactname+'","ModelType":"'+model+'",';
	JsonStr += '"EmbeddedProcessor":"'+embedpro+'",	"NATAddress":"","PieURL":"","LineCard":"'+linecard+'","ConnectivityFlag":"","CheckConnectivity":""}';
	var parseJ = $.parseJSON(JsonStr);
	var devices = getDevicesNodeJSON();
	if(devices != null && devices != undefined){
		for(var a=0; a< devices.length; a++){
			if(devices[a].DEVICE != null && devices[a].DEVICE != undefined && devices[a].DEVICE.length == 0 && devices[a].ObjectPath == objpath){
        		devices[a].DEVICE.push(parseJ);
	        }else{
    	        var ctr =0;
				if(devices[a].DEVICE != null && devices[a].DEVICE != undefined){
	        		for(var b=0; b< devices[a].DEVICE.length;b++){
    	        		if(devices[a].DEVICE[b].ObjectPath == objpath && devices[a].ObjectPath == objpath){
        	        		ctr++;
            	    	}
           			}
				}
	            if(ctr == 0 && devices[a].ObjectPath == objpath){
    	        	devices[a].DEVICE.push(parseJ);
        	   	}
			}
		}
	}
}

 /*
 *  FUNCTION NAME : setSlotInformation
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating slot node
 *  PARAMETERS    : 
 *
 */
function setSlotInformation (slotdevid,prodnum,slotname,objpath,num,moddesc,sernum,model,board,slotdev,slotid,redflag,update,stats){
	var JsonStr = '';
	JsonStr +='{ "ObjectPath":"'+objpath+'","SerialNumber":"'+sernum+'","UpdateFlag":"'+update+'","SlotName":"'+slotname+'","ProductNumber":"'+prodnum+'","Number":"'+num+'","SubChannel":"","SlotDevName":"'+slotdev+'","BoardType":"'+board+'","Status":"'+stats+'","PORT":[]}';
	var devices = getDevicesNodeJSON();
	var parseJ = $.parseJSON(JsonStr);
	var deviceobject;
	var slotflag = false;
	for(var a=0; a < devices.length; a++){
		if((devices[a].SLOT.length == 0 || devices[a].SLOT == undefined || devices[a].SLOT == null) && devices[a].ObjectPath == slotdev){
			slotflag = true;
            devices[a].SLOT.push(parseJ);
			break;
		}
	}
}

/*
 *
 *  FUNCTION NAME : setPortInformation
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating PORT Node
 *  PARAMETERS    : 
 *
 */
function setPortInformation(switchportinfo,switchinfo,vlanid,vlanname,phyport,portresid,portslotid,portid,num,portname,update,portflag,objpath,avail,type,red,partner,bandwidth,speed,enableport,exclusive,tunnelservice,multiservice,porttype,portcheck,partnerportdev,partnerinfo,desc,media,auto,duplex,portconfig,phy,spa,carrier,portcard,ethmode,speed2,sequence,savecon,portDevName,stats){
	var JsonStr = '';
    JsonStr += '{ "PortPreIosHfr": "", "SwitchPortInfo": "'+switchportinfo+'", "PortPreIosEna": "", "Exclusivity": "'+exclusive+'", "PortPreIosClassic": "", "PortPostHfr": "", "Duplexity": "'+duplex+'", "Phy": "", "PortPreEna": "",';
	JsonStr += '"PortPostMc": "", "AutoNegotiation": "'+auto+'", "PortConfig": "'+portconfig+'", "SaveConnectivity": "'+savecon+'", "PortPostModel": "", "PortPostEna": "", "Spa": "'+spa+'", "PortPostIosClassic": "",';
	JsonStr += '"PartnerInformation": "'+partnerinfo+'", "Ipv6NetId": "", "Speed2": "'+speed2+'", "Ipv6SubNet": "", "PortPostIosEna": "", "Ipv6Address": "", "EthMode": "'+ethmode+'", "SubChannel": "","Status":"'+stats+'",';
	JsonStr += '"PartnerPortDevice": "'+partnerportdev+'", "RevMask": "", "Description": "'+desc+'", "PortCard": "'+portcard+'", "ObjectPath": "'+objpath+'", "Subnet": "", "PhysicalPortType": "'+phyport+'",';
	JsonStr += '"TunnelServicesPIC": "'+tunnelservice+'", "PortCheck": "'+portcheck+'", "EnablePort": "'+enableport+'", "Speed": "'+speed+'", "Number": "'+num+'", "PortType": "'+porttype+'", "Address": "","PortDevName":"'+portDevName+'",';
	JsonStr += '"MultiServicesPIC": "'+multiservice+'", "UpdateFlag": "'+update+'", "MediaType": "'+media+'", "Bandwidth": "'+bandwidth+'", "Availability": "'+avail+'", "Sequence": "'+sequence+'","PortFlag": "'+portflag+'",';
	JsonStr += '"PortName": "'+portname+'","PortSequence": "", "CarrierCard": "'+carrier+'", "PartnerPort": "'+partner+'", "VlanId": "", "SwitchInfo": "'+switchinfo+'","VlanName": "",';
	if(subChannel == true){
		JsonStr += '"SUBCHANNEL": [] }';
	}else{
		JsonStr += '"PORTMAP": [] }';
	}
	var parsed = $.parseJSON(JsonStr);
	var portArr = portDevName.split(".");
	var devObject = getDeviceObject2(portArr[0]);
	if(devObject.SLOT != null && devObject.SLOT != undefined){
		for(var t=0; t<devObject.SLOT.length; t++){
			if(devObject.SLOT[t].PORT != null && devObject.SLOT[t].PORT != undefined){
				devObject.SLOT[t].PORT.push(parsed);
			}
		}
	}
}

/*
 *
 *  FUNCTION NAME : setSubChannelInformation
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : March 3, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating SUBCHANNEL Node
 *  PARAMETERS    : 
 *
 */
function setSubChannelInformation(portpreioshfr,switchportinfo,portpreiosena,exclusivity,portpreiosclassic,portposthfr,duplexicity,phy,portpreena,portpostmc,autoneg,portconfig,saveconn,portpostmodel,portpostena,spa,portpostiosclassic,partnerinfo,ipv6netid,speed2,ipv6subnet,portpostiosena,ipv6add,ethmode,subchann,partnerportdev,revmask,desc,portcard,objectpth,subnet,physporttype,tunnelservicespic,portcheck,enaport,speed,num,porttype,address,multiservicespic,updteflag,mediatype,bandwidth,avai,seq,portflg,portnme,portseq,carriercard,partnerport,vlanid,switchinfo,vlanname){
	var JsonStr ='';
	JsonStr += '{"PortPreIosHfr":"'+portpreioshfr+'","SwitchPortInfo":"'+switchportinfo+'","PortPreIosEna":"'+portpreiosena+'","Exclusivity":"'+exclusivity+'","PortPreIosClassic":"'+portpreiosclassic+'",';
	JsonStr += '"PortPostHfr":"'+portposthfr+'","Duplexity":"'+duplexicity+'","Phy":"'+phy+'","PortPreEna":"'+portpreena+'","PortPostMc":"'+portpostmc+'","AutoNegotiation":"'+autoneg+'","PortConfig":"'+portconfig+'",';
	JsonStr += '"SaveConnectivity":"'+saveconn+'","PortPostModel":"'+portpostmodel+'","PortPostEna":"'+portpostena+'","Spa":"'+spa+'","PortPostIosClassic":"'+portpostiosclassic+'","PartnerInformation":"'+partnerinfo+'",';
	JsonStr += '"Ipv6NetId":"'+ipv6netid+'","Speed2":"'+speed2+'","Ipv6SubNet":"'+ipv6subnet+'","PortPostIosEna":"'+portpostiosena+'","Ipv6Address":"'+ipv6add+'","EthMode":"'+ethmode+'","SubChannel":"'+subchann+'",';
	JsonStr += '"PartnerPortDevice":"'+partnerportdev+'","RevMask":"'+revmask+'","Description":"'+desc+'","PortCard":"'+portcard+'","ObjectPath":"'+objectpth+'","Subnet":"'+subnet+'","PhysicalPortType":"'+physporttype+'",';
	JsonStr += '"TunnelServicesPIC":"'+tunnelservicespic+'","PortCheck":"'+portcheck+'","EnablePort":"'+enaport+'","Speed":"'+speed+'","Number":"'+num+'","PortType":"'+porttype+'","Address":"'+address+'",';
	JsonStr += '"MultiServicesPIC":"'+multiservicespic+'","UpdateFlag":"'+updteflag+'","MediaType":"'+mediatype+'","Bandwidth":"'+bandwidth+'","Availability":"'+avai+'","Sequence":"'+seq+'","PortFlag":"'+portflg+'",';
	JsonStr += '"PortName":"'+portnme+'","PortSequence":"'+portseq+'","CarrierCard":"'+carriercard+'","PartnerPort":"'+partnerport+'","VlanId":"'+vlanid+'","SwitchInfo":"'+switchinfo+'","VlanName":"'+vlanname+'","PORTMAP":[]}';
	var parsed = $.parseJSON(JsonStr);
	var srcDev = objectpth.split(".");
    var port = [];
    port = getAllPortOfDevice(srcDev[0],port);
	for(var a=0; a< port.length; a++){
        if(port[a].ObjectPath == objectpth){
            if(port[a].SUBCHANNEL){
                port[a].SUBCHANNEL.push(parsed);
            }else{
                port[a].PORTMAP.push(parsed);
            }
        }
    }
}

/*
 *
 *  FUNCTION NAME : setPortMapInformation
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : March 3, 2014
 *  MODIFIED BY   : 
 *  q
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For creating PORTMAP Node
 *  PARAMETERS    : 
 *
 */
function setPortMapInformation(name,sourcedev,destdev,sourceport,destport,id,srcip,dstip,portid,portid2,dest,source,linkname,checkcon,condone,srcslot,dstslot,srcport,dstport,portmonitor,conflag){
	var JsonStr = '';
	JsonStr += '{"DstIp":"'+dstip+'","Destination":"'+dest+'","LinkName":"'+linkname+'","Source":"'+source+'","Name":"'+name+'","CheckConnectivity":"'+checkcon+'","SrcMonitorPort":"'+srcport+'",';
	JsonStr += '"DstMonitorPort":"'+dstport+'","DstMonitorSlot":"'+dstslot+'","SrcIp":"'+srcip+'","SrcMonitorSlot":"'+srcslot+'","ConnectivityFlag":"'+conflag+'","PortMonitorEnable":"'+portmonitor+'"}';
	var parsed = $.parseJSON(JsonStr);
	var srcDev = source.split(".");
    var port2 = [];
    port2 = getAllPortOfDevice(srcDev[0],port2);
    for(var a=0; a< port2.length; a++){
        if(port2[a].ObjectPath == source || port2[a].ObjectPath == dest){
            if(port2[a].SUBCHANNEL){
				port2[a].SUBCHANNEL[0].PORTMAP = [];
                port2[a].SUBCHANNEL[0].PORTMAP.push(parsed);
            }else{
				port2[a].PORTMAP = [];
				port2[a].PORTMAP.push(parsed);
            }
        }
    }
	var port = []
    var dstDev = dest.split(".");
    port = getAllPortOfDevice(dstDev[0],port);
	for(var a=0; a< port.length; a++){
        if(port[a].ObjectPath == source || port[a].ObjectPath == dest){
            if(port[a].SUBCHANNEL){
				port[a].SUBCHANNEL[0].PORTMAP = [];
                port[a].SUBCHANNEL[0].PORTMAP.push(parsed);
            }else{
				port[a].PORTMAP = [];
                port[a].PORTMAP.push(parsed);
            }
        }
    }
}


/*
 *
 *  FUNCTION NAME : getDevicesNodeJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For getting the DEVICES Node
 *  PARAMETERS    : objPth
 *
 */
function getDevicesNodeJSON(){	
	if(globalMAINCONFIG.length > 0){
		for(var a=0; a< globalMAINCONFIG.length;a++){
			if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
				return globalMAINCONFIG[a].MAINCONFIG[0].DEVICES;
			}
		}
	}else{
		var dataArr = new Array();
		return dataArr;
	}
}

/*
 *
 *  FUNCTION NAME : getDeviceNodeJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For getting the DEVICE Node, needs the ObjectPath of the DEVICES node
 *  PARAMETERS    : objPth
 *
 */
function getDeviceNodeJSON(objPth){
	var devices = getDevicesNodeJSON();
    var ret =0;
    for(var a=0; a< devices.length; a++){
        if(devices[a].ObjectPath == objPth){
            ret = devices[a].DEVICE;
            a = devices.length;
        }
    }
    return ret;
}


/*
 *
 *  FUNCTION NAME : getSlotNodeJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For getting the SLOT Node, needs the ObjectPath of the DEVICES node
 *  PARAMETERS    : objPth
 *
 */
function getSlotNodeJSON(objPth){
	var devices = getDevicesNodeJSON();
	var ret =0;
    for(var a=0; a< devices.length; a++){
		var slobjpth = objPth.split(".")[0];
        if(devices[a].ObjectPath == slobjpth){
			ret = devices[a].SLOT;
			a = devices.length;
        }
    }
	return ret;
}


/*
 *
 *  FUNCTION NAME : getAllAvailablePortsJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : MArch 20, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For getting the all the available ports
 *  PARAMETERS    : 
 *
 */
function getAllAvailablePortsJSON(){
	var devices = getDevicesNodeJSON();
	var ret=[];
	for(var a=0; a< devices.length; a++){
		ret = getDeviceChildPort(devices[a],ret);
	}
	return ret;
}

/*
 *
 *  FUNCTION NAME : getStringJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 17, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : For getting the string version of the JSON in the parameters
 *  PARAMETERS    : obj - Json format
 *
 */
function getStringJSON(obj){
	modifyMainConfigJSON();
    return JSON.stringify(obj);
}

/*
 *
 *  FUNCTION NAME : getDataFromJSON
 *  AUTHOR        : Mark Anthony O. Elbambo
 *  DATE          : February 24, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get the JSON from CGI and convert it to json object for canvas
 *  PARAMETERS    : obj - Json format
 *
 */
function getDataFromJSON(obj){
	if(obj.MAINCONFIG[0].PageCanvas == undefined || obj.MAINCONFIG[0].PageCanvas == "" || obj.MAINCONFIG[0].PageCanvas == null || obj.MAINCONFIG[0].PageCanvas == "undefined"){
		obj.MAINCONFIG[0].PageCanvas = pageCanvas;
	}
    if(obj.MAINCONFIG[0].PageCanvas == pageCanvas && globalMAINCONFIG.length>0){
		var flag = false;
		for(var a=0; a< globalMAINCONFIG.length;a++){
            if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas && globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == obj.MAINCONFIG[0].PageCanvas){
				flag = true;
				globalMAINCONFIG[a] = obj;
				a = globalMAINCONFIG.length
			}
		}
		if(!flag){
			globalMAINCONFIG.push(obj);
		}
	}else if(globalMAINCONFIG.length == 0){

		globalMAINCONFIG.push(obj);
	}

	var dataArr = obj.MAINCONFIG[0].DEVICES;
	if(dataArr != null && dataArr != undefined){
        window['variable' + dynamicResourceId[pageCanvas] ] = checkValue(obj.MAINCONFIG[0].ResourceId);
        window['variable' + dynamicMainId[pageCanvas] ] = checkValue(obj.MAINCONFIG[0].MainId);
	}
	drawImage();
	setTimeout(function(){
		drawImage();
	},300);
}
/*
 *
 *  FUNCTION NAME : removespecificconfig
 *  AUTHOR        : Juvindle Tina
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : remove specific object
 *  PARAMETERS    : 
 *
 */
function removespecificconfig(){
	for(var a=0; a< globalMAINCONFIG.length;a++){
       if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
           globalMAINCONFIG.splice(a,1);
           a = globalMAINCONFIG.length
        }
    }
}
/*
 *
 *  FUNCTION NAME : pushdevices
 *  AUTHOR        : Juvindle Tina
 *  DATE          : March 15, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : push devices in globalMAINCONFIG
 *  PARAMETERS    : device
 *
 */
function pushdevices(device){
    if(globalMAINCONFIG.length>0){
		var flag = false;
		for(var a=0; a< globalMAINCONFIG.length;a++){
            if(globalMAINCONFIG[a].MAINCONFIG[0].PageCanvas == pageCanvas){
				for(var t=0; t<device.length; t++){
           			globalMAINCONFIG[a].MAINCONFIG[0].DEVICES.push(device[t]);
		   		}
				flag = true;
				a = globalMAINCONFIG.length
			}
		}
	}

}


/*
 *
 *  FUNCTION NAME : getDataForDeviceListJSON
 *  AUTHOR        : Mark Anthony Elbambo
 *  DATE          : March 18, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sets devlist object to mainconfig
 *  PARAMETERS    : data
 *
 */
function getDataForDeviceListJSON(data){
	idsArray = [];
	idsArray = getalldevicepath(idsArray);
    var mConfig = data.MAINCONFIG[0].DEVICES;
    for(var t=0; t<mConfig.length; t++){
		var xpos = mConfig[t].XLocation;
		var ypos = mConfig[t].YLocation;
		if(globalManageDeviceShow.toLowerCase()=="tooltipdevice"){
        	xpos = gblDevMenX;
            ypos = gblDevMenY;
        }else{
            ypos = imgYPos;
            xpos = imgXPos;
            imgXPos+=50;
        }
        var device = mConfig[t];
        var path = device.ObjectPath;
		device.XLocation = xpos;
		device.YLocation = ypos;
        if(path == ""){
            if (globalManageDeviceShow.toLowerCase()=="tooltipdevice"){
                path = glblDevMenImg;
            }else{
                var cnt = 1;
                path = generateDevicePath(cnt);
                idsArray.push(path);
            }
            device.ObjectPath = path;
			setSlotObjPath(device);	
        }
		if(device.Status == undefined || device.Status == null || device.Status == ""){
			device.Status = "";
		}
    }
	pushdevices(mConfig);
}
/*
 *
 *  FUNCTION NAME : getAllPortOfDevice
 *  AUTHOR        : Juvindle C . Tine
 *  DATE          : March 21, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get all port object of device
 *  PARAMETERS    : device
 *
 */
function getAllPortOfDevice(device){
	var myArray = [];
	var devices = getDevicesNodeJSON();
	for(var t=0; t<devices.length; t++){
		if(devices[t].ObjectPath == device){
			myArray = getDeviceChildPort(devices[t],myArray);
		}
	}
	return myArray;
}
/*
 *
 *  FUNCTION NAME : getDeviceChildPort
 *  AUTHOR        : Juvindle C . Tine
 *  DATE          : March 21, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get child device
 *  PARAMETERS    : device,myArray
 *
 */
function getDeviceChildPort(device,myArray){
	if(device.SLOT != null && device.SLOT != undefined){
		myArray = checkChildObject(device.SLOT,myArray);
	}else if(device.RACK != null && device.RACK != undefined){
		myArray = checkChildObject(device.RACK,myArray);
	}else if(device.MODULE != null && device.MODULE != undefined){
		myArray = checkChildObject(device.MODULE,myArray);
	}else if(device.PORT != null && device.PORT != undefined){
		for(var d=0; d<device.PORT.length; d++){
			if(device.PORT[d].SUBCHANNEL != null && device.PORT[d].SUBCHANNEL != undefined){
				myArray = checkChildObject(device.PORT[d],myArray);
			}else{
				myArray.push(device.PORT[d]);
			}
		}
	}else if(device.SUBCHANNEL != null && device.SUBCHANNEL != undefined){
		for(var d=0; d<device.SUBCHANNEL.length; d++){
			myArray.push(device.SUBCHANNEL[d]);
		}
	}
	return myArray;
}
/*
 *
 *  FUNCTION NAME : checkChildObject
 *  AUTHOR        : Juvindle C . Tine
 *  DATE          : March 21, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : get child object port
 *  PARAMETERS    : device,myArray
 *
 */
function checkChildObject(devicearr,myArray){
	for(var t=0; t<devicearr.length; t++){
		myArray = getDeviceChildPort(devicearr[t],myArray);
	}
	return myArray;
}
/*
 *
 *  FUNCTION NAME : setSlotObjPath
 *  AUTHOR        : James Turingan
 *  DATE          : March 21, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sets object path to mainconfig
 *  PARAMETERS    : device
 *
 */

function setSlotObjPath(device){
	if(device.SLOT){
		for(var i = 0 ; i < device.SLOT.length; i++){
			device.SLOT[i].ObjectPath = device.ObjectPath + '.' + 'Slot_' +  device.SLOT[i].Number;
			if(device.SLOT[i].MODULE){
				for(var j = 0 ; j < device.SLOT[i].MODULE.length; j++){
					device.SLOT[i].MODULE[j].ObjectPath = device.SLOT[i].ObjectPath + '.' + 'Module_' + device.SLOT[i].MODULE[j].Number;
					for(var k = 0 ; k < device.SLOT[i].MODULE[j].PORT.length; k++){
						if(device.SLOT[i].MODULE[j].PORT[k].PhysicalPortType != ""){
							var portname = device.SLOT[i].MODULE[j].PORT[k].PhysicalPortType + '_' + device.SLOT[i].MODULE[j].PORT[k].Number;
						}else{
							var portname = device.SLOT[i].MODULE[j].PORT[k].Number;
						}

						device.SLOT[i].MODULE[j].PORT[k].ObjectPath = device.SLOT[i].MODULE[j].ObjectPath + '.' + 'Port_' + portname;
			
					}
				}
			}else if(device.SLOT[i].PORT){
				for(var m = 0 ; m < device.SLOT[i].PORT.length; m++){
					if(device.SLOT[i].PORT[m].PhysicalPortType != ""){
						var portname = device.SLOT[i].PORT[m].PhysicalPortType + '_' +  device.SLOT[i].PORT[m].Number;
					}else{
						var portname = device.SLOT[i].PORT[m].Number;
					}
					device.SLOT[i].PORT[m].ObjectPath = device.SLOT[i].ObjectPath + '.' + 'Port_' + portname;
				}

			}	
		}
	}else if(device.RACK){
		for(var i = 0 ; i < device.RACK.length; i++){
			device.RACK[i].ObjectPath = device.ObjectPath + '.' + 'RACK_' +  device.RACK[i].Number;
			setRackChildObjPath(device.RACK[i]);
		}
	}else if(device.MODULE){
		for(var i = 0 ; i < device.MODULE.length; i++){
			device.MODULE[i].ObjectPath = device.ObjectPath + '.' + 'Module_' +  device.MODULE[i].Number;
			for(var m = 0 ; m < device.MODULE[i].PORT.length; m++){
				if(device.MODULE[i].PORT[m].PhysicalPortType != ""){
					var portname = device.MODULE[i].PORT[m].PhysicalPortType + '_' +  device.MODULE[i].PORT[m].Number;
				}else{
					var portname = device.MODULE[i].PORT[m].Number;
				}
				device.MODULE[i].PORT[m].ObjectPath = device.MODULE[i].ObjectPath + '.' + 'Port_' + portname;
			}
			
		}

	}else if(device.PORT){
		for(var i = 0 ; i < device.PORT.length; i++){
			device.PORT[i].ObjectPath = device.ObjectPath + '.' + 'Port_' +  device.PORT[i].Number;
		}

	}
}

/*
 *
 *  FUNCTION NAME : setRackChildObjPath
 *  AUTHOR        : James Turingan
 *  DATE          : March 22, 2014
 *  MODIFIED BY   : 
 *  REVISION DATE : 
 *  REVISION #    : 
 *  DESCRIPTION   : sets object path to mainconfig
 *  PARAMETERS    : device
 *
 */

function setRackChildObjPath(device){
	for(var i = 0 ; i < device.SLOT.length; i++){
		device.SLOT[i].ObjectPath = device.ObjectPath + '.' + 'Slot_' +  device.SLOT[i].Number;
		if(device.SLOT[i].MODULE){
			for(var j = 0 ; j < device.SLOT[i].MODULE.length; j++){
				device.SLOT[i].MODULE[j].ObjectPath = device.SLOT[i].ObjectPath + '.' + 'Module_' + device.SLOT[i].MODULE[j].Number;
				for(var k = 0 ; k < device.SLOT[i].MODULE[j].PORT.length; k++){
					if(device.SLOT[i].MODULE[j].PORT[k].PhysicalPortType != ""){
						var portname = device.SLOT[i].MODULE[j].PORT[k].PhysicalPortType + '_' + device.SLOT[i].MODULE[j].PORT[k].Number;
					}else{
						var portname = device.SLOT[i].MODULE[j].PORT[k].Number;
					}

					device.SLOT[i].MODULE[j].PORT[k].ObjectPath = device.SLOT[i].MODULE[j].ObjectPath + '.' + 'Port_' + portname;
			
				}
			}
		}else if(device.SLOT[i].PORT){
			for(var m = 0 ; m < device.SLOT[i].PORT.length; m++){
				if(device.SLOT[i].PORT[m].PhysicalPortType != ""){
					var portname = device.SLOT[i].PORT[m].PhysicalPortType + '_' +  device.SLOT[i].PORT[m].Number;
				}else{
					var portname = device.SLOT[i].PORT[m].Number;
				}
				device.SLOT[i].PORT[m].ObjectPath = device.SLOT[i].ObjectPath + '.' + 'Port_' + portname;
			}

		}	
	}

}
