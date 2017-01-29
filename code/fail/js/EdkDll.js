function EdkDll() {
	eObj = document.getElementById('ElsPlugin');
}

EdkDll.eObj;

EdkDll.DebugLog = false;
// EdkDll.eEvent;
// EdkDll.hEvent;
EdkDll.version;
EdkDll.EDK_OK = 0x0000;
EdkDll.EDK_UNKNOWN_ERROR = 0x0001;
EdkDll.EDK_INVALID_PROFILE_ARCHIVE = 0x0101;
EdkDll.EDK_NO_USER_FOR_BASEPROFILE = 0x0102;
EdkDll.EDK_CANNOT_ACQUIRE_DATA = 0x0200;
EdkDll.EDK_BUFFER_TOO_SMALL = 0x0300;
EdkDll.EDK_OUT_OF_RANGE = 0x0301;
EdkDll.EDK_INVALID_PARAMETER = 0x0302;
EdkDll.EDK_PARAMETER_LOCKED = 0x0303;
EdkDll.EDK_COG_INVALID_TRAINING_ACTION = 0x0304;
EdkDll.EDK_COG_INVALID_TRAINING_CONTROL = 0x0305;
EdkDll.EDK_COG_INVALID_ACTIVE_ACTION = 0x0306;
EdkDll.EDK_COG_EXCESS_MAX_ACTIONS = 0x0307;
EdkDll.EDK_EXP_NO_SIG_AVAILABLE = 0x0308;
EdkDll.EDK_FILESYSTEM_ERROR = 0x0309;
EdkDll.EDK_INVALID_USER_ID = 0x0400;
EdkDll.EDK_EMOENGINE_UNINITIALIZED = 0x0500;
EdkDll.EDK_EMOENGINE_DISCONNECTED = 0x0501;
EdkDll.EDK_EMOENGINE_PROXY_ERROR = 0x0502;
EdkDll.EDK_NO_EVENT = 0x0600;
EdkDll.EDK_GYRO_NOT_CALIBRATED = 0x0700;
EdkDll.EDK_OPTIMIZATION_IS_ON = 0x0800;
EdkDll.EDK_RESERVED1 = 0x0900;

EdkDll.EE_ExpressivThreshold_t = {
	EXP_SENSITIVITY : 0
};
EdkDll.EE_ExpressivTrainingControl_t = {
	EXP_NONE : 0,
	EXP_START : 1,
	EXP_ACCEPT : 2,
	EXP_REJECT : 3,
	EXP_ERASE : 4,
	EXP_RESET : 5
};
EdkDll.EE_ExpressivSignature_t = {
	EXP_SIG_UNIVERSAL : 0,
	EXP_SIG_TRAINED : 1
};
EdkDll.EE_CognitivTrainingControl_t = {
	COG_NONE : 0,
	COG_START : 1,
	COG_ACCEPT : 2,
	COG_REJECT : 3,
	COG_ERASE : 4,
	COG_RESET : 5
};
EdkDll.EE_Event_t = {
	EE_UnknownEvent : 0x0000,
	EE_EmulatorError : 0x0001,
	EE_ReservedEvent : 0x0002,
	EE_UserAdded : 0x0010,
	EE_UserRemoved : 0x0020,
	EE_EmoStateUpdated : 0x0040,
	EE_ProfileEvent : 0x0080,
	EE_CognitivEvent : 0x0100,
	EE_ExpressivEvent : 0x0200,
	EE_InternalStateChanged : 0x0400,
};
EdkDll.EE_ExpressivEvent_t = {
	EE_ExpressivNoEvent : 0,
	EE_ExpressivTrainingStarted : 1,
	EE_ExpressivTrainingSucceeded : 2,
	EE_ExpressivTrainingFailed : 3,
	EE_ExpressivTrainingCompleted : 4,
	EE_ExpressivTrainingDataErased : 5,
	EE_ExpressivTrainingRejected : 6,
	EE_ExpressivTrainingReset : 7
};
EdkDll.EE_CognitivEvent_t = {
	EE_CognitivNoEvent : 0,
	EE_CognitivTrainingStarted : 1,
	EE_CognitivTrainingSucceeded : 2,
	EE_CognitivTrainingFailed : 3,
	EE_CognitivTrainingCompleted : 4,
	EE_CognitivTrainingDataErased : 5,
	EE_CognitivTrainingRejected : 6,
	EE_CognitivTrainingReset : 7,
	EE_CognitivAutoSamplingNeutralCompleted : 8,
	EE_CognitivSignatureUpdated : 9
};
EdkDll.EE_DataChannel_t = {
	COUNTER : 0,
	INTERPOLATED : 1,
	RAW_CQ : 2,
	AF3 : 3,
	F7 : 4,
	F3 : 5,
	FC5 : 6,
	T7 : 7,
	P7 : 8,
	O1 : 9,
	O2 : 10,
	P8 : 11,
	T8 : 12,
	FC6 : 13,
	F4 : 14,
	F8 : 15,
	AF4 : 16,
	GYROX : 17,
	GYROY : 18,
	TIMESTAMP : 19,
	ES_TIMESTAMP : 20,
	FUNC_ID : 21,
	FUNC_VALUE : 22,
	MARKER : 23,
	SYNC_SIGNAL : 24
};
EdkDll.EE_EmotivSuite_t = {
	EE_EXPRESSIV : 0,
	EE_AFFECTIV : 1,
	EE_COGNITIV : 2
};
EdkDll.EE_ExpressivAlgo_t = {
	EXP_NEUTRAL : 0x0001,
	EXP_BLINK : 0x0002,
	EXP_WINK_LEFT : 0x0004,
	EXP_WINK_RIGHT : 0x0008,
	EXP_HORIEYE : 0x0010,
	EXP_EYEBROW : 0x0020,
	EXP_FURROW : 0x0040,
	EXP_SMILE : 0x0080,
	EXP_CLENCH : 0x0100,
	EXP_LAUGH : 0x0200,
	EXP_SMIRK_LEFT : 0x0400,
	EXP_SMIRK_RIGHT : 0x0800
};
EdkDll.EE_AffectivAlgo_t = {
	AFF_EXCITEMENT : 0x0001,
	AFF_MEDITATION : 0x0002,
	AFF_FRUSTRATION : 0x0004,
	AFF_ENGAGEMENT_BOREDOM : 0x0008
};
EdkDll.EE_CognitivAction_t = {
	COG_NEUTRAL : 0x0001,
	COG_PUSH : 0x0002,
	COG_PULL : 0x0004,
	COG_LIFT : 0x0008,
	COG_DROP : 0x0010,
	COG_LEFT : 0x0020,
	COG_RIGHT : 0x0040,
	COG_ROTATE_LEFT : 0x0080,
	COG_ROTATE_RIGHT : 0x0100,
	COG_ROTATE_CLOCKWISE : 0x0200,
	COG_ROTATE_COUNTER_CLOCKWISE : 0x0400,
	COG_ROTATE_FORWARDS : 0x0800,
	COG_ROTATE_REVERSE : 0x1000,
	COG_DISAPPEAR : 0x2000
};
EdkDll.EE_SignalStrength_t = {
	NO_SIGNAL : 0,
	BAD_SIGNAL : 1,
	GOOD_SIGNAL : 2
};
EdkDll.EE_InputChannels_t = {
	EE_CHAN_CMS : 0,
	EE_CHAN_DRL : 1,
	EE_CHAN_FP1 : 2,
	EE_CHAN_AF3 : 3,
	EE_CHAN_F7 : 4,
	EE_CHAN_F3 : 5,
	EE_CHAN_FC5 : 6,
	EE_CHAN_T7 : 7,
	EE_CHAN_P7 : 8,
	EE_CHAN_O1 : 9,
	EE_CHAN_O2 : 10,
	EE_CHAN_P8 : 11,
	EE_CHAN_T8 : 12,
	EE_CHAN_FC6 : 13,
	EE_CHAN_F4 : 14,
	EE_CHAN_F8 : 15,
	EE_CHAN_AF4 : 16,
	EE_CHAN_FP2 : 17
};
EdkDll.EE_EEG_ContactQuality_t = {
	EEG_CQ_NO_SIGNAL : 0,
	EEG_CQ_VERY_BAD : 1,
	EEG_CQ_POOR : 2,
	EEG_CQ_FAIR : 3,
	EEG_CQ_GOOD : 4
};

EdkDll.IEE_FacialExpressionThreshold_t = {
	FE_SENSITIVITY : 0
};
EdkDll.IEE_FacialExpressionTrainingControl_t = {
	FE_NONE : 0,
	FE_START : 1,
	FE_ACCEPT : 2,
	FE_REJECT : 3,
	FE_ERASE : 4,
	FE_RESET : 5
};
EdkDll.IEE_FacialExpressionSignature_t = {
	FE_SIG_UNIVERSAL : 0,
	FE_SIG_TRAINED : 1
};
EdkDll.IEE_MentalCommandTrainingControl_t = {
	MC_NONE : 0,
	MC_START : 1,
	MC_ACCEPT : 2,
	MC_REJECT : 3,
	MC_ERASE : 4,
	MC_RESET : 5
};
EdkDll.IEE_Event_t = {
	IEE_UnknownEvent : 0x0000,
	IEE_EmulatorError : 0x0001,
	IEE_ReservedEvent : 0x0002,
	IEE_UserAdded : 0x0010,
	IEE_UserRemoved : 0x0020,
	IEE_EmoStateUpdated : 0x0040,
	IEE_ProfileEvent : 0x0080,
	IEE_MentalCommandEvent : 0x0100,
	IEE_FacialExpressionEvent : 0x0200,
	IEE_InternalStateChanged : 0x0400,
	IEE_AllEvent : (0x0010 | 0x0020 | 0x0040 | 0x0080 | 0x0100 | 0x0200 | 0x0400)
};
EdkDll.IEE_FacialExpressionEvent_t = {
	IEE_FacialExpressionNoEvent : 0,
	IEE_FacialExpressionTrainingStarted : 1,
	IEE_FacialExpressionTrainingSucceeded : 2,
	IEE_FacialExpressionTrainingFailed : 3,
	IEE_FacialExpressionTrainingCompleted : 4,
	IEE_FacialExpressionTrainingDataErased : 5,
	IEE_FacialExpressionTrainingRejected : 6,
	IEE_FacialExpressionTrainingReset : 7
};
EdkDll.IEE_MentalCommandEvent_t = {
	IEE_MentalCommandNoEvent : 0,
	IEE_MentalCommandTrainingStarted : 1,
	IEE_MentalCommandTrainingSucceeded : 2,
	IEE_MentalCommandTrainingFailed : 3,
	IEE_MentalCommandTrainingCompleted : 4,
	IEE_MentalCommandTrainingDataErased : 5,
	IEE_MentalCommandTrainingRejected : 6,
	IEE_MentalCommandTrainingReset : 7,
	IEE_MentalCommandAutoSamplingNeutralCompleted : 8,
	IEE_MentalCommandSignatureUpdated : 9
};
EdkDll.IEE_DataChannel_t = {
	IED_COUNTER : 0,
	IED_INTERPOLATED : 1,
	IED_RAW_CQ : 2,
	IED_AF3 : 3,
	IED_GYROSCOPEZ : 4,
	IED_GYROSCOPEX : 5,
	IED_GYROSCOPEY : 6,
	IED_T7 : 7,
	IED_ACCX : 8,
	IED_Pz : 9,
	IED_ACCY : 10,
	IED_ACCZ : 11,
	IED_T8 : 12,
	IED_MAGY : 13,
	IED_MAGZ : 14,
	IED_MAGX : 15,
	IED_AF4 : 16,
	IED_GYROX : 17,
	IED_GYROY : 18,
	IED_TIMESTAMP : 19,
	IED_ES_TIMESTAMP : 20,
	IED_FUNC_ID : 21,
	IED_FUNC_VALUE : 22,
	IED_MARKER : 23,
	IED_SYNC_SIGNAL : 24
};
EdkDll.IEE_EmotivSuite_t = {
	IEE_FACIALEXPRESSION : 0,
	IEE_PERFORMANCEMETRIC : 1,
	IEE_MENTALCOMMAND : 2
};
EdkDll.IEE_FacialExpressionAlgo_t = {
	FE_NEUTRAL : 0x0001,
	FE_BLINK : 0x0002,
	FE_WINK_LEFT : 0x0004,
	FE_WINK_RIGHT : 0x0008,
	FE_HORIEYE : 0x0010,
	FE_SURPRISE : 0x0020,
	FE_FROWN : 0x0040,
	FE_SMILE : 0x0080,
	FE_CLENCH : 0x0100
};
EdkDll.IEE_PerformanceMetricAlgo_t = {
	PM_EXCITEMENT : 0x0001,
	PM_RELAXATION : 0x0002,
	PM_STRESS : 0x0004,
	PM_ENGAGEMENT : 0x0008,
	PM_INTEREST : 0x0010
};
EdkDll.IEE_MentalCommandAction_t = {
	MC_NEUTRAL : 0x0001,
	MC_PUSH : 0x0002,
	MC_PULL : 0x0004,
	MC_LIFT : 0x0008,
	MC_DROP : 0x0010,
	MC_LEFT : 0x0020,
	MC_RIGHT : 0x0040,
	MC_ROTATE_LEFT : 0x0080,
	MC_ROTATE_RIGHT : 0x0100,
	MC_ROTATE_CLOCKWISE : 0x0200,
	MC_ROTATE_COUNTER_CLOCKWISE : 0x0400,
	MC_ROTATE_FORWARDS : 0x0800,
	MC_ROTATE_REVERSE : 0x1000,
	MC_DISAPPEAR : 0x2000
};
EdkDll.IEE_SignalStrength_t = {
	NO_SIG : 0,
	BAD_SIG : 1,
	GOOD_SIG : 2
};
EdkDll.IEE_InputChannels_t = {
	IEE_CHAN_CMS : 0,
	IEE_CHAN_DRL : 0,
	IEE_CHAN_AF3 : 3,
	IEE_CHAN_T7 : 7,
	IEE_CHAN_Pz : 9,
	IEE_CHAN_T8 : 12,
	IEE_CHAN_AF4 : 16
};
EdkDll.IEE_EEG_ContactQuality_t = {
	IEEG_CQ_NO_SIGNAL : 0,
	IEEG_CQ_VERY_BAD : 1,
	IEEG_CQ_POOR : 2,
	IEEG_CQ_FAIR : 3,
	IEEG_CQ_GOOD : 4
};

/*
 * [StructLayout(LayoutKind.Sequential)] public class InputSensorDescriptor_t {
 * public EE_InputChannels_t channelId; // logical channel id public fExists; //
 * does this sensor exist on this headset model public pszLabel; // text label
 * identifying this sensor public Double xLoc; // x coordinate from center of
 * head towards nose public Double yLoc; // y coordinate from center of head
 * towards ears public Double zLoc; // z coordinate from center of head toward
 * top of skull }
 */

// EdkDll.version = ELSPlugin().version;
// Main
// EdkDll.EE_EngineConnect();
// hEvent = EE_EmoEngineEventCreate();
// ///////////////////////////////////////////////////////
// function EngineConnect return 0 if successful
EdkDll.addEvent = function(obj, name, func) {
	if (EdkDll.DebugLog) {
		console.log("EdkDll.addEvent()");
	}
	if (obj.attachEvent) {
		obj.attachEvent("on" + name, func);
	} else {
		obj.addEventListener(name, func, false);
	}
};

/**
 * Check url is valid license, call event when success
 * 
 * @returns {*}
 * @constructor
 */
EdkDll.ELS_ValidLicense = function() {
	var ELS_ValidLicense = ELSPlugin().ELS_CheckEDKLicense;
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ELS_ValidLicense()");
		console.log(ELS_ValidLicense);
	}
	return ELS_ValidLicense;
};

EdkDll.EE_EngineConnect = function() {
	var EngineConnect = ELSPlugin().ELS_EE_EngineConnect();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EngineConnect()");
		console.log(EngineConnect);
	}
	return null;
};

// return unsigned int
EdkDll.EE_GetError = function() {
	var GetError = ELSPlugin().ELS_EE_GetError();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_GetError()");
		console.log(GetError);
	}
	return GetError;
};

// return int = 0 if ok
EdkDll.EE_EngineRemoteConnect = function() {
	var EngineRemoteConnect = ELSPlugin().ELS_EE_EngineRemoteConnect();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EngineRemoteConnect()");
		console.log(EngineRemoteConnect);
	}
	return EngineRemoteConnect;
};

// return int = 0 if ok
EdkDll.EE_EngineDisconnect = function() {
	var EngineDisconnect = ELSPlugin().ELS_EE_EngineDisconnect();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EngineDisconnect()");
		console.log(EngineDisconnect);
	}
	return EngineDisconnect;
};

// not used
EdkDll.EE_EnableDiagnostics = function(szFilename, fEnable, nReserved) {
};

// privte on plugin
EdkDll.EE_EmoEngineEventCreate = function() {
};

// private on plugin
EdkDll.EE_ProfileEventCreate = function() {
};

// not used: free EmoEngineEvent
EdkDll.EE_EmoEngineEventFree = function() {
};

// private on plugin
EdkDll.EE_EmoStateCreate = function() {
	// return ELSPlugin().ELS_EE_EmoStateCreate();
};

// not used: note free help free memory
EdkDll.EE_EmoStateFree = function(hState) {
};

// return EE_Event_t
EdkDll.EE_EmoEngineEventGetType = function() {
	var EmoEngineEventGetType = ELSPlugin().ELS_EE_EmoEngineEventGetType();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EmoEngineEventGetType()");
		console.log(EmoEngineEventGetType);
	}
	return EmoEngineEventGetType;
};

// return EE_CognitivEvent_t
EdkDll.EE_CognitivEventGetType = function() {
	var CognitivEventGetType = ELSPlugin().ELS_EE_CognitivEventGetType();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivEventGetType()");
		console.log(CognitivEventGetType);
	}
	return CognitivEventGetType;
};

// not used
EdkDll.EE_ExpressivEventGetType = function() {
	var ExpressivEventGetType = ELSPlugin().ELS_EE_ExpressivEventGetType();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivEventGetType()");
		console.log(ExpressivEventGetType);
	}
	return ExpressivEventGetType;
};

// return int = userID: note remove hEvent from this function, can effect
// website
EdkDll.EE_EmoEngineEventGetUserId = function() {
	var EmoEngineEventGetUserId = ELSPlugin().ELS_EE_EmoEngineEventGetUserId();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EmoEngineEventGetUserId()");
		console.log(EmoEngineEventGetUserId);
	}
	return EmoEngineEventGetUserId;
};

// return int = 0 if ok: update emostate
EdkDll.EE_EmoEngineEventGetEmoState = function() {
	var EmoEngineEventGetEmoState = ELSPlugin()
			.ELS_EE_EmoEngineEventGetEmoState();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EmoEngineEventGetEmoState()");
		console.log(EmoEngineEventGetEmoState);
	}
	return EmoEngineEventGetEmoState;
};

// return int = 0 if ok: update next event to hevent
EdkDll.EE_EngineGetNextEvent = function() {
	var EngineGetNextEvent = ELSPlugin().ELS_EE_EngineGetNextEvent();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EngineGetNextEvent()");
		console.log(EngineGetNextEvent);
	}
	return EngineGetNextEvent;
};

// not used
EdkDll.EE_EngineClearEventQueue = function(eventTypes) {
};

// return int is number user
EdkDll.EE_EngineGetNumUser = function() {
	var EngineGetNumUser = ELSPlugin().ELS_EE_EngineGetNumUser();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EngineGetNumUser()");
		console.log(EngineGetNumUser);
	}
	return EngineGetNumUser;
};

// not used
EdkDll.EE_SetHardwarePlayerDisplay = function(playerNum) {
};

// not used
EdkDll.EE_SetUserProfile = function(profileBuffer, length) {
};

// not used
EdkDll.EE_GetUserProfile = function(userId) {
};

// not used, had public on Plugin
EdkDll.EE_GetBaseProfile = function() {
	var GetBaseProfile = ELSPlugin().ELS_EE_GetBaseProfile();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_GetBaseProfile()");
		console.log(GetBaseProfile);
	}
	return GetBaseProfile;
};

EdkDll.EE_SetBaseProfile = function(userId) {
	var SetBaseProfile = ELSPlugin().ELS_EE_SetBaseProfile(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_SetBaseProfile(" + userId + ")");
		console.log(SetBaseProfile);
	}
	return SetBaseProfile;
};

// not used
EdkDll.EE_GetUserProfileSize = function() {
};

/*
 * EdkDll.EE_GetUserProfileBytes = function( hEvt, Byte[] destBuffer, U length) { }
 */

// return int
EdkDll.EE_LoadUserProfile = function(userID, szInputFilename) {
	var LoadUserProfile = ELSPlugin().ELS_LoadUserProfile(userID,
			szInputFilename);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_LoadUserProfile(" + userID + ","
				+ szInputFilename + ")");
		console.log(LoadUserProfile);
	}
	return LoadUserProfile;
};

// return int
EdkDll.EE_SaveUserProfile = function(userID, szOutputFilename) {
	var SaveUserProfile = ELSPlugin().ELS_SaveUserProfile(userID,
			szOutputFilename);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_SaveUserProfile(" + userID + ","
				+ szOutputFilename + ")");
		console.log(SaveUserProfile);
	}
	return SaveUserProfile;
};

// return string
EdkDll.EE_GetLocalAppDataPath = function() {
	var GetLocalAppDataPath = ELSPlugin().ELS_GetLocalAppDataPath();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_GetLocalAppDataPath()");
		console.log(GetLocalAppDataPath);
	}
	return GetLocalAppDataPath;
};

// return int
EdkDll.EE_ExpressivSetThreshold = function(userId, algoName, thresholdName,
		value) {
	var ExpressivSetThreshold = ELSPlugin().ELS_EE_ExpressivSetThreshold(
			userId, algoName, thresholdName, value);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivSetThreshold(" + userId + ","
				+ algoName + "," + thresholdName + "," + value + ")");
		console.log(ExpressivSetThreshold);
	}
	return ExpressivSetThreshold;
};

// return int: Threshold
EdkDll.EE_ExpressivGetThreshold = function(userId, algoName, thresholdName) {
	var ExpressivGetThreshold = ELSPlugin().ELS_EE_ExpressivGetThreshold(
			userId, algoName, thresholdName);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivGetThreshold(" + userId + ","
				+ algoName + "," + thresholdName + ")");
		console.log(ExpressivGetThreshold);
	}
	return ExpressivGetThreshold;
};

// not used: not support training expressiv
EdkDll.EE_ExpressivSetTrainingAction = function(userId, action) {
	var ExpressivSetTrainingAction = ELSPlugin()
			.ELS_EE_ExpressivSetTrainingAction(userId, action);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivSetTrainingAction(" + userId + ","
				+ action + ")");
		console.log(ExpressivSetTrainingAction);
	}
	return ExpressivSetTrainingAction;
};

// not used: not support training expressiv
EdkDll.EE_ExpressivSetTrainingControl = function(userId, control) {
	var ExpressivSetTrainingControl = ELSPlugin()
			.ELS_EE_ExpressivSetTrainingControl(userId, control);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivSetTrainingControl(" + userId + ","
				+ control + ")");
		console.log(ExpressivSetTrainingControl);
	}
	return ExpressivSetTrainingControl;
};

// not used: not support training expressiv
EdkDll.EE_ExpressivGetTrainingAction = function(userId) {
};

// not used: not support training expressiv
EdkDll.EE_ExpressivGetTrainingTime = function(userId) {
};

// new update
EdkDll.EE_ExpressivGetTrainedSignatureActions = function(userId) {
	var ExpressivGetTrainedSignatureActions = ELSPlugin()
			.ELS_EE_ExpressivGetTrainedSignatureActions(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivGetTrainedSignatureActions(" + userId
				+ ")");
		console.log(ExpressivGetTrainedSignatureActions);
	}
	return ExpressivGetTrainedSignatureActions;
};

// new update
EdkDll.EE_ExpressivGetTrainedSignatureAvailable = function(userId) {
	var ExpressivGetTrainedSignatureAvailable = ELSPlugin()
			.ELS_EE_ExpressivGetTrainedSignatureAvailable(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivGetTrainedSignatureAvailable(" + userId
				+ ")");
		console.log(ExpressivGetTrainedSignatureAvailable);
	}
	return ExpressivGetTrainedSignatureAvailable;
};

// new update
EdkDll.EE_ExpressivSetSignatureType = function(userId, sigType) {
	var ExpressivSetSignatureType = ELSPlugin()
			.ELS_EE_ExpressivSetSignatureType(userId, sigType);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivSetSignatureType(" + userId + ","
				+ sigType + ")");
		console.log(ExpressivSetSignatureType);
	}
	return ExpressivSetSignatureType;
};

// new update
EdkDll.EE_ExpressivGetSignatureType = function(userId) {
	var ExpressivGetSignatureType = ELSPlugin()
			.ELS_EE_ExpressivGetSignatureType(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_ExpressivGetSignatureType(" + userId + ")");
		console.log(ExpressivGetSignatureType);
	}
	return ExpressivGetSignatureType;
};

// return int is error code, = 0 if ok, set enable a action
EdkDll.EE_CognitivSetActiveActions = function(userId, activeActions) {
	var CognitivSetActiveActions = ELSPlugin().ELS_EE_CognitivSetActiveActions(
			userId, activeActions);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivSetActiveActions(" + userId + ","
				+ activeActions + ")");
		console.log(CognitivSetActiveActions);
	}
	return CognitivSetActiveActions;
};

// return long, is actions enabled
EdkDll.EE_CognitivGetActiveActions = function(userId) {
	var CognitivGetActiveActions = ELSPlugin().ELS_EE_CognitivGetActiveActions(
			userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetActiveActions(" + userId + ")");
		console.log(CognitivGetActiveActions);
	}
	return CognitivGetActiveActions;
};

// return int = 0 if ok, function push Cognitiv Action to list action need to be
// enabled
EdkDll.EE_EnableCognitivAction = function(cognitivAction, cogBool) {
	var EnableCognitivAction = ELSPlugin().ELS_EnableCognitivAction(
			cognitivAction, cogBool);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EnableCognitivAction(" + cognitivAction + ","
				+ cogBool + ")");
		console.log(EnableCognitivAction);
	}
	return EnableCognitivAction;
};

// return int = 0 if ok, enable list of pushed Cognitiv Action
EdkDll.EE_EnableCognitivActionsList = function(userId) {
	var EnableCognitivActionsList = ELSPlugin().ELS_EnableCognitivActionsList(
			userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_EnableCognitivActionsList(" + userId + ")");
		console.log(EnableCognitivActionsList);
	}
	return EnableCognitivActionsList;
};

// return list of enabled Cognitiv Action
EdkDll.EE_CognitivGetActionsEnabled = function(userId) {
	var CognitivGetActionsEnabled = ELSPlugin()
			.ELS_EE_CognitivGetActionsEnabled(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetActionsEnabled(" + userId + ")");
		console.log(CognitivGetActionsEnabled);
	}
	return CognitivGetActionsEnabled;
};

// not used
EdkDll.EE_CognitivGetTrainingTime = function(userId) {
};

// return int = 0 if ok
EdkDll.EE_CognitivSetTrainingControl = function(userId, control) {
	var CognitivSetTrainingControl = ELSPlugin()
			.ELS_EE_CognitivSetTrainingControl(userId, control);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivSetTrainingControl(" + userId + ","
				+ control + ")");
		console.log(CognitivSetTrainingControl);
	}
	return CognitivSetTrainingControl;
};

// return int = 0 if ok
EdkDll.EE_CognitivSetTrainingAction = function(userId, action) {
	var CognitivSetTrainingAction = ELSPlugin()
			.ELS_EE_CognitivSetTrainingAction(userId, action);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivSetTrainingAction(" + userId + ","
				+ action + ")");
		console.log(CognitivSetTrainingAction);
	}
	return CognitivSetTrainingAction;
};

// not used
EdkDll.EE_CognitivGetTrainingAction = function(userId) {
};

// return list of trained cognitiv action
EdkDll.EE_CognitivGetTrainedSignatureActions = function(userId) {
	var CognitivGetTrainedSignatureActions = ELSPlugin()
			.ELS_EE_CognitivGetTrainedSignatureActions(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetTrainedSignatureActions(" + userId
				+ ")");
		console.log(CognitivGetTrainedSignatureActions);
	}
	return CognitivGetTrainedSignatureActions;
};

// return float
EdkDll.EE_CognitivGetOverallSkillRating = function(userId) {
	var CognitivGetOverallSkillRating = ELSPlugin()
			.ELS_EE_CognitivGetOverallSkillRating(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetOverallSkillRating(" + userId + ")");
		console.log(CognitivGetOverallSkillRating);
	}
	return CognitivGetOverallSkillRating;
};

// return float
EdkDll.EE_CognitivGetActionSkillRating = function(userId, action) {
	var CognitivGetActionSkillRating = ELSPlugin()
			.ELS_EE_CognitivGetActionSkillRating(userId, action);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetActionSkillRating(" + userId + ","
				+ action + ")");
		console.log(CognitivGetActionSkillRating);
	}
	return CognitivGetActionSkillRating;
};

// new update
EdkDll.EE_CognitivSetActivationLevel = function(userId, level) {
	var CognitivSetActivationLevel = ELSPlugin()
			.ELS_EE_CognitivSetActivationLevel(userId, level);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivSetActivationLevel(" + userId + ","
				+ level + ")");
		console.log(CognitivSetActivationLevel);
	}
	return CognitivSetActivationLevel;
};

// new update
EdkDll.EE_CognitivSetActionSensitivity = function(userId, action1Sensitivity,
		action2Sensitivity, action3Sensitivity, action4Sensitivity) {
	var CognitivSetActionSensitivity = ELSPlugin()
			.ELS_EE_CognitivSetActionSensitivity(userId, action1Sensitivity,
					action2Sensitivity, action3Sensitivity, action4Sensitivity);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivSetActionSensitivity(" + userId + ","
				+ action1Sensitivity + "," + action2Sensitivity + ","
				+ action3Sensitivity + "," + action4Sensitivity + ")");
		console.log(CognitivSetActionSensitivity);
	}
	return CognitivSetActionSensitivity;
};

// new update
EdkDll.EE_CognitivGetActivationLevel = function(userId) {
	var CognitivGetActivationLevel = ELSPlugin()
			.ELS_EE_CognitivGetActivationLevel(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetActivationLevel(" + userId + ")");
		console.log(CognitivGetActivationLevel);
	}
	return CognitivGetActivationLevel;
};

// new update
EdkDll.EE_CognitivGetActionSensitivity = function(userId) {
	var CognitivGetActionSensitivity = ELSPlugin()
			.ELS_EE_CognitivGetActionSensitivity(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetActionSensitivity(" + userId + ")");
		console.log(CognitivGetActionSensitivity);
	}
	return CognitivGetActionSensitivity;
};

// not used
EdkDll.EE_CognitivStartSamplingNeutral = function(userId) {
};

// not used
EdkDll.EE_CognitivStopSamplingNeutral = function(userId) {
};

// new update
EdkDll.EE_CognitivSetSignatureCaching = function(userId, enabled) {
	var CognitivSetSignatureCaching = ELSPlugin()
			.ELS_EE_CognitivSetSignatureCaching(userId, enabled);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivSetSignatureCaching(" + userId + ","
				+ enabled + ")");
		console.log(CognitivSetSignatureCaching);
	}
	return CognitivSetSignatureCaching;
};

// new update
EdkDll.EE_CognitivGetSignatureCaching = function(userId) {
	var CognitivGetSignatureCaching = ELSPlugin()
			.ELS_EE_CognitivGetSignatureCaching(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetSignatureCaching(" + userId + ")");
		console.log(CognitivGetSignatureCaching);
	}
	return CognitivGetSignatureCaching;
};

// new update
EdkDll.EE_CognitivSetSignatureCacheSize = function(userId, size) {
	var CognitivSetSignatureCacheSize = ELSPlugin()
			.ELS_EE_CognitivSetSignatureCacheSize(userId, size);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivSetSignatureCacheSize(" + userId + ","
				+ size + ")");
		console.log(CognitivSetSignatureCacheSize);
	}
	return CognitivSetSignatureCacheSize;
};

// new update
EdkDll.EE_CognitivGetSignatureCacheSize = function(userId) {
	var CognitivGetSignatureCacheSize = ELSPlugin()
			.ELS_EE_CognitivGetSignatureCacheSize(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_CognitivGetSignatureCacheSize(" + userId + ")");
		console.log(CognitivGetSignatureCacheSize);
	}
	return CognitivGetSignatureCacheSize;
};

// not used
EdkDll.EE_HeadsetGetSensorDetails = function(channelId) {
};

// not used
EdkDll.EE_HardwareGetVersion = function(userId) {
};

/*
 * EdkDll.EE_SoftwareGetVersion(Builder pszVersionOut, U nVersionChars, out U
 * pBuildNumOut) { }
 */
// return an Array with pXOut = array[0] and pYOut = array[1]
EdkDll.EE_HeadsetGetGyroDelta = function(userId) {
	var HeadsetGetGyroDelta = ELSPlugin().ELS_EE_HeadsetGetGyroDelta(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_HeadsetGetGyroDelta(" + userId + ")");
		console.log(HeadsetGetGyroDelta);
	}
	return HeadsetGetGyroDelta;
};

// return int = 0 if ok
EdkDll.EE_HeadsetGyroRezero = function(userId) {
	var HeadsetGyroRezero = ELSPlugin().ELS_EE_HeadsetGyroRezero(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_HeadsetGyroRezero(" + userId + ")");
		console.log(HeadsetGyroRezero);
	}
	return HeadsetGyroRezero;
};

// not used
EdkDll.EE_OptimizationParamCreate = function() {
};

// not used
EdkDll.EE_OptimizationParamFree = function(hParam) {
};

// not used
EdkDll.EE_OptimizationEnable = function(hParam) {
};

// not used
EdkDll.EE_OptimizationIsEnabled = function() {
};

// not used
EdkDll.EE_OptimizationDisable = function() {
};

// not used
EdkDll.EE_OptimizationGetParam = function(hParam) {
};

// not used
EdkDll.EE_OptimizationGetVitalAlgorithm = function(hParam, suite) {
};

// not used
EdkDll.EE_OptimizationSetVitalAlgorithm = function(hParam, suite,
		vitalAlgorithmBitVector) {
};

// not used
EdkDll.EE_ResetDetection = function(userId, suite, detectionBitVector) {
};

// not supported
EdkDll.ES_Create = function() {
};

// not supported
EdkDll.ES_Free = function() {
};

// not supported
EdkDll.ES_Init = function() {
};

// return second time in float
EdkDll.ES_GetTimeFromStart = function() {
	var GetTimeFromStart = ELSPlugin().ELS_ES_GetTimeFromStart();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_GetTimeFromStart()");
		console.log(GetTimeFromStart);
	}
	return GetTimeFromStart;
};

// not used
EdkDll.ES_GetHeadsetOn = function() {
};

// not used
EdkDll.ES_GetNumContactQualityChannels = function() {
};

EdkDll.ES_GetContactQualityFromAllChannels = function() {
	var GetContactQualityFromAllChannels = ELSPlugin()
			.ELS_ES_GetContactQualityFromAllChannels();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_GetContactQualityFromAllChannels()");
		console.log(GetContactQualityFromAllChannels);
	}
	return GetContactQualityFromAllChannels;
};

EdkDll.EE_DataAcquisitionEnable = function(userId, enable) {
	var DataAcquisitionEnable = ELSPlugin().ELS_EE_DataAcquisitionEnable(
			userId, enable);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_DataAcquisitionEnable(" + userId + "," + enable
				+ ")");
		console.log(DataAcquisitionEnable);
	}
	return DataAcquisitionEnable;
};

EdkDll.EE_DataSetBufferSizeInSec = function(bufferSizeInSec) {
	var DataSetBufferSizeInSec = ELSPlugin().ELS_EE_DataSetBufferSizeInSec(
			bufferSizeInSec);
	if (EdkDll.DebugLog) {
		console
				.log("EdkDll.EE_DataSetBufferSizeInSec(" + bufferSizeInSec
						+ ")");
		console.log(DataSetBufferSizeInSec);
	}
	return DataSetBufferSizeInSec;
};

EdkDll.EE_DataUpdateHandle = function(userId) {
	var DataUpdateHandle = ELSPlugin().ELS_EE_DataUpdateHandle(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_DataUpdateHandle(" + userId + ")");
		console.log(DataUpdateHandle);
	}
	return DataUpdateHandle;
};

EdkDll.EE_DataGet = function() {
	var DataGet = ELSPlugin().ELS_EE_DataGet();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.EE_DataGet()");
		console.log(DataGet);
	}
	return DataGet;
};

// not used
EdkDll.ES_GetContactQuality = function(electroIdx) {
};

// return int 1 or 0
EdkDll.ES_ExpressivIsBlink = function() {
	var ExpressivIsBlink = ELSPlugin().ELS_ES_ExpressivIsBlink();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsBlink()");
		console.log(ExpressivIsBlink);
	}
	return ExpressivIsBlink;
};

// return int 1 or 0
EdkDll.ES_ExpressivIsLeftWink = function() {
	var ExpressivIsLeftWink = ELSPlugin().ELS_ES_ExpressivIsLeftWink();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsLeftWink()");
		console.log(ExpressivIsLeftWink);
	}
	return ELSPlugin().ELS_ES_ExpressivIsLeftWink();
};

// return int 1 or 0
EdkDll.ES_ExpressivIsRightWink = function() {
	var ExpressivIsRightWink = ELSPlugin().ELS_ES_ExpressivIsRightWink();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsRightWink()");
		console.log(ExpressivIsRightWink);
	}
	return ExpressivIsRightWink;
};

// return int 1 or 0
EdkDll.ES_ExpressivIsEyesOpen = function() {
	var ExpressivIsEyesOpen = ELSPlugin().ELS_ES_ExpressivIsEyesOpen();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsEyesOpen()");
		console.log(ExpressivIsEyesOpen);
	}
	return ExpressivIsEyesOpen;
};

// return int 1 or 0
EdkDll.ES_ExpressivIsLookingUp = function() {
	var ExpressivIsLookingUp = ELSPlugin().ELS_ES_ExpressivIsLookingUp();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsLookingUp()");
		console.log(ExpressivIsLookingUp);
	}
	return ExpressivIsLookingUp;
};

// return int 1 or 0
EdkDll.ES_ExpressivIsLookingDown = function() {
	var ExpressivIsLookingDown = ELSPlugin().ELS_ES_ExpressivIsLookingDown();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsLookingDown()");
		console.log(ExpressivIsLookingDown);
	}
	return ExpressivIsLookingDown;
};

// return int 1 or 0
EdkDll.ES_ExpressivIsLookingLeft = function() {
	var ExpressivIsLookingLeft = ELSPlugin().ELS_ES_ExpressivIsLookingLeft();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsLookingLeft()");
		console.log(ExpressivIsLookingLeft);
	}
	return ExpressivIsLookingLeft;
};

// return int 1 or 0
EdkDll.ES_ExpressivIsLookingRight = function() {
	var ExpressivIsLookingRight = ELSPlugin().ELS_ES_ExpressivIsLookingRight();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivIsLookingRight()");
		console.log(ExpressivIsLookingRight);
	}
	return ExpressivIsLookingRight;
};

// not used
EdkDll.ES_ExpressivGetEyelidState = function(state, size) {
};

// not used
EdkDll.ES_ExpressivGetEyeLocation = function(state, size) {
};

// not used
EdkDll.ES_ExpressivGetEyebrowExtent = function() {
};

// return float 0.0 to 1.0
EdkDll.ES_ExpressivGetSmileExtent = function() {
	var ExpressivGetSmileExtent = ELSPlugin().ELS_ES_ExpressivGetSmileExtent();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivGetSmileExtent()");
		console.log(ExpressivGetSmileExtent);
	}
	return ExpressivGetSmileExtent;
};

// return float from 0.0 to 1.0
EdkDll.ES_ExpressivGetClenchExtent = function() {
	var ExpressivGetClenchExtent = ELSPlugin()
			.ELS_ES_ExpressivGetClenchExtent();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivGetClenchExtent()");
		console.log(ExpressivGetClenchExtent);
	}
	return ExpressivGetClenchExtent;
};

// return EE_ExpressivAlgo_t is upper face action
EdkDll.ES_ExpressivGetUpperFaceAction = function() {
	var ExpressivGetUpperFaceAction = ELSPlugin()
			.ELS_ES_ExpressivGetUpperFaceAction();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivGetUpperFaceAction()");
		console.log(ExpressivGetUpperFaceAction);
	}
	return ExpressivGetUpperFaceAction;
};

// return float is power of upper action
EdkDll.ES_ExpressivGetUpperFaceActionPower = function() {
	var ExpressivGetUpperFaceActionPower = ELSPlugin()
			.ELS_ES_ExpressivGetUpperFaceActionPower();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivGetUpperFaceActionPower()");
		console.log(ExpressivGetUpperFaceActionPower);
	}
	return ExpressivGetUpperFaceActionPower;
};

// return EE_ExpressivAlgo_t is lower face action
EdkDll.ES_ExpressivGetLowerFaceAction = function() {
	var ExpressivGetLowerFaceAction = ELSPlugin()
			.ELS_ES_ExpressivGetLowerFaceAction();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivGetLowerFaceAction()");
		console.log(ExpressivGetLowerFaceAction);
	}
	return ExpressivGetLowerFaceAction;
};

// return float is Power of lower face action
EdkDll.ES_ExpressivGetLowerFaceActionPower = function() {
	var ExpressivGetLowerFaceActionPower = ELSPlugin()
			.ELS_ES_ExpressivGetLowerFaceActionPower();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivGetLowerFaceActionPower()");
		console.log(ExpressivGetLowerFaceActionPower);
	}
	return ELSPlugin().ELS_ES_ExpressivGetLowerFaceActionPower();
};

// not used
EdkDll.ES_ExpressivIsActive = function(state, type) {
};

// return float in 0.0 to 1.0
EdkDll.ES_AffectivGetExcitementLongTermScore = function() {
	var AffectivGetExcitementLongTermScore = ELSPlugin()
			.ELS_ES_AffectivGetExcitementLongTermScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivGetExcitementLongTermScore()");
		console.log(AffectivGetExcitementLongTermScore);
	}
	return ELSPlugin().ELS_ES_AffectivGetExcitementLongTermScore();
};

// return float in 0.0 to 1.0
EdkDll.ES_AffectivGetExcitementShortTermScore = function() {
	var AffectivGetExcitementShortTermScore = ELSPlugin()
			.ELS_ES_AffectivGetExcitementShortTermScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivGetExcitementShortTermScore()");
		console.log(AffectivGetExcitementShortTermScore);
	}
	return AffectivGetExcitementShortTermScore;
};

// not used
EdkDll.ES_AffectivIsActive = function(state, type) {
};

// return float in 0.0 to 1.0
EdkDll.ES_AffectivGetMeditationScore = function() {
	var AffectivGetMeditationScore = ELSPlugin()
			.ELS_ES_AffectivGetMeditationScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivGetMeditationScore()");
		console.log(AffectivGetMeditationScore);
	}
	return ELSPlugin().ELS_ES_AffectivGetMeditationScore();
};

// return float in 0.0 to 1.0
EdkDll.ES_AffectivGetFrustrationScore = function() {
	var AffectivGetFrustrationScore = ELSPlugin()
			.ELS_ES_AffectivGetFrustrationScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivGetFrustrationScore()");
		console.log(AffectivGetFrustrationScore);
	}
	return AffectivGetFrustrationScore;
};

// return float in 0.0 to 1.0
EdkDll.ES_AffectivGetEngagementBoredomScore = function() {
	var AffectivGetEngagementBoredomScore = ELSPlugin()
			.ELS_ES_AffectivGetEngagementBoredomScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivGetEngagementBoredomScore()");
		console.log(AffectivGetEngagementBoredomScore);
	}
	return AffectivGetEngagementBoredomScore;
};

// return float in 0.0 to 1.0
EdkDll.ES_AffectivGetValenceScore = function() {
	var AffectivGetValenceScore = ELSPlugin().ELS_ES_AffectivGetValenceScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivGetValenceScore()");
		console.log(AffectivGetValenceScore);
	}
	return AffectivGetValenceScore;
};

EdkDll.ES_AffectivRawValueGet = function() {
	var AffectivRawValueGet = ELSPlugin().ELS_ES_AffectivRawValueGet();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivRawValueGet()");
		console.log(AffectivRawValueGet);
	}
	return AffectivRawValueGet;
};

// return current action EE_CognitivAction_t
EdkDll.ES_CognitivGetCurrentAction = function() {
	var CognitivGetCurrentAction = ELSPlugin()
			.ELS_ES_CognitivGetCurrentAction();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_CognitivGetCurrentAction()");
		console.log(CognitivGetCurrentAction);
	}
	return CognitivGetCurrentAction;
};

// return float is power of current action
EdkDll.ES_CognitivGetCurrentActionPower = function() {
	var CognitivGetCurrentActionPower = ELSPlugin()
			.ELS_ES_CognitivGetCurrentActionPower();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_CognitivGetCurrentActionPower()");
		console.log(CognitivGetCurrentActionPower);
	}
	return ELSPlugin().ELS_ES_CognitivGetCurrentActionPower();
};

// not used
EdkDll.ES_CognitivIsActive = function(state) {
};

// not used
EdkDll.ES_CognitivGetCurrentLevelRating = function(state) {
};

// return int is wireless
EdkDll.ES_GetWirelessSignalStatus = function() {
	var GetWirelessSignalStatus = ELSPlugin().ELS_ES_GetWirelessSignalStatus();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_GetWirelessSignalStatus()");
		console.log(GetWirelessSignalStatus);
	}
	return GetWirelessSignalStatus;
};

// not used
EdkDll.ES_Copy = function() {
};

// not used
EdkDll.ES_AffectivEqual = function() {
	var AffectivEqual = ELSPlugin().ELS_ES_AffectivEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_AffectivEqual()");
		console.log(AffectivEqual);
	}
	return ELSPlugin().ELS_ES_AffectivEqual();
};

// not used
EdkDll.ES_ExpressivEqual = function() {
	var ExpressivEqual = ELSPlugin().ELS_ES_ExpressivEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_ExpressivEqual()");
		console.log(ExpressivEqual);
	}
	return ExpressivEqual;
};

// not used
EdkDll.ES_CognitivEqual = function() {
	var CognitivEqual = ELSPlugin().ELS_ES_CognitivEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_CognitivEqual()");
		console.log(CognitivEqual);
	}
	return ELSPlugin().ELS_ES_CognitivEqual();
};

// not used
EdkDll.ES_EmoEngineEqual = function() {
	var EmoEngineEqual = ELSPlugin().ELS_ES_EmoEngineEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_EmoEngineEqual()");
		console.log(EmoEngineEqual);
	}
	return EmoEngineEqual;
};

// not used
EdkDll.ES_Equal = function(a, b) {
};

// return max and charge level in int
EdkDll.ES_GetBatteryChargeLevel = function() {
	var GetBatteryChargeLevel = ELSPlugin().ELS_ES_GetBatteryChargeLevel();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.ES_GetBatteryChargeLevel()");
		console.log(GetBatteryChargeLevel);
	}
	return GetBatteryChargeLevel;
};

/*******************************************************************************
 * Insight functions
 */

/**
 * Connect to Insight Headset
 * 
 * @returns: 0 if ok, -1 if not
 */
EdkDll.IEE_EngineConnect = function() {
	var IEngineConnect = ELSPlugin().ELS_IEE_EngineConnect();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EngineConnect()");
		console.log(IEngineConnect);
	}
	return IEngineConnect;
};

/**
 * Connect to Insight Composer
 * 
 * @returns: 0 if ok, -1 if not
 */
EdkDll.IEE_EngineRemoteConnect = function() {
	var IEE_EngineRemoteConnect = ELSPlugin().ELS_IEE_EngineRemoteConnect();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EngineRemoteConnect()");
		console.log(IEE_EngineRemoteConnect);
	}
	return IEE_EngineRemoteConnect;
};

/**
 * Retrieves the next EmoEngine event
 * 
 * @returns EDK_ERROR_CODE = EDK_OK if a new event has been retrieved
 *          EDK_ERROR_CODE = EDK_NO_EVENT if no new events have been generated
 *          by EmoEngine
 */
EdkDll.IEE_EngineGetNextEvent = function() {
	var IEE_EngineGetNextEvent = ELSPlugin().ELS_IEE_EngineGetNextEvent();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EngineGetNextEvent()");
		console.log(IEE_EngineGetNextEvent);
	}
	return IEE_EngineGetNextEvent;
};

/**
 * Copies an EmoState returned with a IEE_EmoStateUpdate event to memory
 * referenced by an EmoStateHandle.
 * 
 * @returns return EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful.
 */
EdkDll.IEE_EmoEngineEventGetEmoState = function() {
	var IEE_EmoEngineEventGetEmoState = ELSPlugin()
			.ELS_IEE_EmoEngineEventGetEmoState();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EmoEngineEventGetEmoState()");
		console.log(IEE_EmoEngineEventGetEmoState);
	}
	return IEE_EmoEngineEventGetEmoState;
};

/**
 * Returns the event type for an event already retrieved using
 * IEE_EngineGetNextEvent.
 * 
 * @returns: IEE_Event_t value
 */
EdkDll.IEE_EmoEngineEventGetType = function() {
	var IEE_EmoEngineEventGetType = ELSPlugin().ELS_IEE_EmoEngineEventGetType();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EmoEngineEventGetType()");
		console.log(IEE_EmoEngineEventGetType);
	}
	return IEE_EmoEngineEventGetType;
};

/**
 * Retrieves the user ID for IEE_UserAdded and IEE_UserRemoved events.
 * 
 * @returns return EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful.
 */
EdkDll.IEE_EmoEngineEventGetUserId = function() {
	var IEE_EmoEngineEventGetUserId = ELSPlugin()
			.ELS_IEE_EmoEngineEventGetUserId();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EmoEngineEventGetUserId()");
		console.log(IEE_EmoEngineEventGetUserId);
	}
	return IEE_EmoEngineEventGetUserId;
};

/**
 * Retrieves number of active users connected to the EmoEngine.
 * 
 * @returns return EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful.
 */
EdkDll.IEE_EngineGetNumUser = function() {
	var IEE_EngineGetNumUser = ELSPlugin().ELS_IEE_EngineGetNumUser();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EngineGetNumUser()");
		console.log(IEE_EngineGetNumUser);
	}
	return IEE_EngineGetNumUser;
};

/**
 * Terminates the connection to EmoEngine. This function should be called at the
 * end of programs which make use of EmoEngine, most probably in clean up
 * routine or destructor.
 * 
 * @returns return EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if disconnection is
 *          achieved
 */
EdkDll.IEE_EngineDisconnect = function() {
	var IEE_EngineDisconnect = ELSPlugin().ELS_IEE_EngineDisconnect();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EngineDisconnect()");
		console.log(IEE_EngineDisconnect);
	}
	return IEE_EngineDisconnect;
};

/**
 * Return the time since EmoEngine has been successfully connected to the
 * headset If the headset is disconnected from EmoEngine due to low battery or
 * weak wireless signal, the time will be reset to zero.
 * 
 * @returns: float - time in second
 */
EdkDll.IS_GetTimeFromStart = function() {
	var IS_GetTimeFromStart = ELSPlugin().ELS_IS_GetTimeFromStart();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_GetTimeFromStart()");
		console.log(IS_GetTimeFromStart);
	}
	return IS_GetTimeFromStart;
};

/**
 * Query of the current wireless signal strength
 * 
 * @returns: int - 0,1,2,3,4 according to wireless signal strength [No Signal,
 *           Bad, Fair, Good, Excellent].
 */
EdkDll.IS_GetWirelessSignalStatus = function() {
	var IS_GetWirelessSignalStatus = ELSPlugin()
			.ELS_IS_GetWirelessSignalStatus();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_GetWirelessSignalStatus()");
		console.log(IS_GetWirelessSignalStatus);
	}
	return IS_GetWirelessSignalStatus;
};

/**
 * Get the level of charge remaining in the headset battery
 * 
 * @returns param chargeLevel - the current level of charge in the headset
 *          battery param maxChargeLevel - the maximum level of charge in the
 *          battery
 */
EdkDll.IS_GetBatteryChargeLevel = function() {
	var IS_GetBatteryChargeLevel = ELSPlugin().ELS_IS_GetBatteryChargeLevel();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_GetBatteryChargeLevel()");
		console.log(IS_GetBatteryChargeLevel);
	}
	return IS_GetBatteryChargeLevel;
};

/**
 * Query the contact quality of all the electrodes in one single call
 * 
 * @returns param contactQuality - array of 32-bit float of size numChannels
 *          param numChannels - size (number of floats) of the input array
 *          return Number of signal quality values copied to the contactQuality
 *          array.
 */
EdkDll.IS_GetContactQualityFromAllChannels = function() {
	var IS_GetContactQualityFromAllChannels = ELSPlugin()
			.ELS_IS_GetContactQualityFromAllChannels();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_GetContactQualityFromAllChannels()");
		console.log(IS_GetContactQualityFromAllChannels);
	}
	return IS_GetContactQualityFromAllChannels;
};

/**
 * Query the contact quality of a specific EEG electrode
 * @param: electroIdx - The index of the electrode for query
 * @return: IEE_EEG_ContactQuality_t - Enumerated value that characterizes the EEG electrode contact for the specified input channel
 */
EdkDll.IS_GetContactQuality = function(electroIdx) {
	var IS_GetContactQuality = ELSPlugin()
			.ELS_IS_GetContactQuality(electroIdx);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_GetContactQuality("+electroIdx+")");
		console.log(IS_GetContactQuality);
	}
	return IS_GetContactQuality;
};

/**
 * Query the contact quality for five EEG electrode: AF3, AF4, Pz, T8, AF4
 * @return: array of IEE_EEG_ContactQuality_t  - Enumerated value that characterizes the EEG electrode contact for the specified input channel
 * AF3 = 0, T7 = 1, Pz = 2, T8 = 3, AF4 = 4;
 */
EdkDll.IS_GetContactQualities = function() {
	var IS_GetContactQualities = ELSPlugin()
			.ELS_IS_GetContactQualities();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_GetContactQualities()");
		console.log(IS_GetContactQualities);
	}
	return IS_GetContactQualities;
};

/**
 * Query whether the user is blinking at the time the EmoState is captured.
 * 
 * @returns: blink status (1: blink, 0: not blink)
 */
EdkDll.IS_FacialExpressionIsBlink = function() {
	var IS_FacialExpressionIsBlink = ELSPlugin()
			.ELS_IS_FacialExpressionIsBlink();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionIsBlink()");
		console.log(IS_FacialExpressionIsBlink);
	}
	return IS_FacialExpressionIsBlink;
};

/**
 * Query whether the eyes of the user are opened at the time the EmoState is
 * captured.
 * 
 * @returns: eye open status (1: eyes open, 0: eyes closed)
 */
EdkDll.IS_FacialExpressionIsEyesOpen = function() {
	var IS_FacialExpressionIsEyesOpen = ELSPlugin()
			.ELS_IS_FacialExpressionIsEyesOpen();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionIsEyesOpen()");
		console.log(IS_FacialExpressionIsEyesOpen);
	}
	return IS_FacialExpressionIsEyesOpen;
};

/**
 * Query whether the user is winking left at the time the EmoState is captured.
 * 
 * @returns: left wink status (1: wink, 0: not wink)
 */
EdkDll.IS_FacialExpressionIsLeftWink = function() {
	var IS_FacialExpressionIsLeftWink = ELSPlugin()
			.ELS_IS_FacialExpressionIsLeftWink();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionIsLeftWink()");
		console.log(IS_FacialExpressionIsLeftWink);
	}
	return IS_FacialExpressionIsLeftWink;
};

/**
 * Query whether the user is winking right at the time the EmoState is captured.
 * 
 * @returns: right wink status (1: wink, 0: not wink)
 */
EdkDll.IS_FacialExpressionIsRightWink = function() {
	var IS_FacialExpressionIsRightWink = ELSPlugin()
			.ELS_IS_FacialExpressionIsRightWink();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionIsRightWink()");
		console.log(IS_FacialExpressionIsRightWink);
	}
	return IS_FacialExpressionIsRightWink;
};

/**
 * Query whether the user is looking up at the time the EmoState is captured.
 * 
 * @returns: eyes position (1: looking up, 0: not looking up)
 */
EdkDll.IS_FacialExpressionIsLookingUp = function() {
	var IS_FacialExpressionIsLookingUp = ELSPlugin()
			.ELS_IS_FacialExpressionIsLookingUp();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionIsLookingUp()");
		console.log(IS_FacialExpressionIsLookingUp);
	}
	return IS_FacialExpressionIsLookingUp;
};

/**
 * Query whether the user is looking down at the time the EmoState is captured.
 * 
 * @returns:eyes position (1: looking down, 0: not looking down)
 */
EdkDll.IS_FacialExpressionIsLookingDown = function() {
	var IS_FacialExpressionIsLookingDown = ELSPlugin()
			.ELS_IS_FacialExpressionIsLookingDown();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionIsLookingDown()");
		console.log(IS_FacialExpressionIsLookingDown);
	}
	return IS_FacialExpressionIsLookingDown;
};

/**
 * Returns the eyebrow extent of the user (Obsolete function)
 * 
 * @return: eyebrow extent value (0.0 to 1.0)
 */
EdkDll.IS_FacialExpressionGetEyebrowExtent = function() {
	var IS_FacialExpressionGetEyebrowExtent = ELSPlugin()
			.ELS_IS_FacialExpressionGetEyebrowExtent();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionGetEyebrowExtent()");
		console.log(IS_FacialExpressionGetEyebrowExtent);
	}
	return IS_FacialExpressionGetEyebrowExtent;
};

/**
 * Returns the clench extent of the user (Obsolete function)
 * 
 * @returns: clench extent value (0.0 to 1.0)
 */
EdkDll.IS_FacialExpressionGetClenchExtent = function() {
	var IS_FacialExpressionGetClenchExtent = ELSPlugin()
			.ELS_IS_FacialExpressionGetClenchExtent();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionGetClenchExtent()");
		console.log(IS_FacialExpressionGetClenchExtent);
	}
	return IS_FacialExpressionGetClenchExtent;
};

/**
 * Returns the smile extent of the user (Obsolete function)
 * 
 * @returns: smile extent value (0.0 to 1.0)
 */
EdkDll.IS_FacialExpressionGetSmileExtent = function() {
	var IS_FacialExpressionGetSmileExtent = ELSPlugin()
			.ELS_IS_FacialExpressionGetSmileExtent();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionGetSmileExtent()");
		console.log(IS_FacialExpressionGetSmileExtent);
	}
	return IS_FacialExpressionGetSmileExtent;
};

/**
 * Returns the detected lower face FacialExpression action of the user
 * 
 * @returns: pre-defined FacialExpression action types
 */
EdkDll.IS_FacialExpressionGetLowerFaceAction = function() {
	var IS_FacialExpressionGetLowerFaceAction = ELSPlugin()
			.ELS_IS_FacialExpressionGetLowerFaceAction();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionGetLowerFaceAction()");
		console.log(IS_FacialExpressionGetLowerFaceAction);
	}
	return IS_FacialExpressionGetLowerFaceAction;
};

/**
 * Returns the detected lower face FacialExpression action power of the user
 * 
 * @return power value (0.0 to 1.0)
 */
EdkDll.IS_FacialExpressionGetLowerFaceActionPower = function() {
	var IS_FacialExpressionGetLowerFaceActionPower = ELSPlugin()
			.ELS_IS_FacialExpressionGetLowerFaceActionPower();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionGetLowerFaceActionPower()");
		console.log(IS_FacialExpressionGetLowerFaceActionPower);
	}
	return IS_FacialExpressionGetLowerFaceActionPower;
};

/**
 * Returns the detected upper face FacialExpression action of the user
 * 
 * @returns: return pre-defined FacialExpression action types
 */
EdkDll.IS_FacialExpressionGetUpperFaceAction = function() {
	var IS_FacialExpressionGetUpperFaceAction = ELSPlugin()
			.ELS_IS_FacialExpressionGetUpperFaceAction();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionGetUpperFaceAction()");
		console.log(IS_FacialExpressionGetUpperFaceAction);
	}
	return IS_FacialExpressionGetUpperFaceAction;
};

/**
 * Returns the detected upper face FacialExpression action power of the user
 * 
 * @returns: power value (0.0 to 1.0)
 */
EdkDll.IS_FacialExpressionGetUpperFaceActionPower = function() {
	var IS_FacialExpressionGetUpperFaceActionPower = ELSPlugin()
			.ELS_IS_FacialExpressionGetUpperFaceActionPower();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionGetUpperFaceActionPower()");
		console.log(IS_FacialExpressionGetUpperFaceActionPower);
	}
	return IS_FacialExpressionGetUpperFaceActionPower;
};

/**
 * Returns engagement/boredom level of the user
 * 
 * @returns: engagement/boredom level (0.0 to 1.0)
 */
EdkDll.IS_PerformanceMetricGetEngagementBoredomScore = function() {
	var IS_PerformanceMetricGetEngagementBoredomScore = ELSPlugin()
			.ELS_IS_PerformanceMetricGetEngagementBoredomScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_PerformanceMetricGetEngagementBoredomScore()");
		console.log(IS_PerformanceMetricGetEngagementBoredomScore);
	}
	return IS_PerformanceMetricGetEngagementBoredomScore;
};

/**
 * Returns the long term excitement level of the user
 * 
 * @returns: excitement level (0.0 to 1.0)
 */
EdkDll.IS_PerformanceMetricGetExcitementLongTermScore = function() {
	var IS_PerformanceMetricGetExcitementLongTermScore = ELSPlugin()
			.ELS_IS_PerformanceMetricGetExcitementLongTermScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_PerformanceMetricGetExcitementLongTermScore()");
		console.log(IS_PerformanceMetricGetExcitementLongTermScore);
	}
	return IS_PerformanceMetricGetExcitementLongTermScore;
};

/**
 * Returns short term excitement level of the user
 * 
 * @returns: excitement level (0.0 to 1.0)
 */
EdkDll.IS_PerformanceMetricGetInstantaneousExcitementScore = function() {
	var IS_PerformanceMetricGetInstantaneousExcitementScore = ELSPlugin()
			.ELS_IS_PerformanceMetricGetInstantaneousExcitementScore();
	if (EdkDll.DebugLog) {
		console
				.log("EdkDll.IS_PerformanceMetricGetInstantaneousExcitementScore()");
		console.log(IS_PerformanceMetricGetInstantaneousExcitementScore);
	}
	return IS_PerformanceMetricGetInstantaneousExcitementScore;
};

/**
 * Returns frustration (stress) level of the user
 * 
 * @returns: frustration level (0.0 to 1.0)
 */
EdkDll.IS_PerformanceMetricGetStressScore = function() {
	var IS_PerformanceMetricGetStressScore = ELSPlugin()
			.ELS_IS_PerformanceMetricGetStressScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_PerformanceMetricGetStressScore()");
		console.log(IS_PerformanceMetricGetStressScore);
	}
	return IS_PerformanceMetricGetStressScore;
};

/**
 * Returns meditation (relax) level of the user
 * 
 * @returns: meditation level (0.0 to 1.0)
 */
EdkDll.IS_PerformanceMetricGetRelaxationScore = function() {
	var IS_PerformanceMetricGetRelaxationScore = ELSPlugin()
			.ELS_IS_PerformanceMetricGetRelaxationScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_PerformanceMetricGetRelaxationScore()");
		console.log(IS_PerformanceMetricGetRelaxationScore);
	}
	return IS_PerformanceMetricGetRelaxationScore;
};

/**
 * Returns valence (interest) level of the user
 * 
 * @returns: valence level (0.0 to 1.0)
 */
EdkDll.IS_PerformanceMetricGetInterestScore = function() {
	var IS_PerformanceMetricGetInterestScore = ELSPlugin()
			.ELS_IS_PerformanceMetricGetInterestScore();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_PerformanceMetricGetInterestScore()");
		console.log(IS_PerformanceMetricGetInterestScore);
	}
	return IS_PerformanceMetricGetInterestScore;
};

/**
 * Returns raw model parameters
 * 
 * @return: array of scores
 */
EdkDll.IS_PerformanceMetricRawValueGet = function() {
	var IS_PerformanceMetricRawValueGet = ELSPlugin()
			.ELS_IS_PerformanceMetricRawValueGet();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_PerformanceMetricRawValueGet()");
		console.log(IS_PerformanceMetricRawValueGet);
	}
	return IS_PerformanceMetricRawValueGet;
};

/**
 * Returns the detected MentalCommand action of the user
 * 
 * @returns: MentalCommand action type
 */
EdkDll.IS_MentalCommandGetCurrentAction = function() {
	var IS_MentalCommandGetCurrentAction = ELSPlugin()
			.ELS_IS_MentalCommandGetCurrentAction();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_MentalCommandGetCurrentAction()");
		console.log(IS_MentalCommandGetCurrentAction);
	}
	return IS_MentalCommandGetCurrentAction;
};

/**
 * Returns the detected MentalCommand action power of the user
 * 
 * @returns: MentalCommand action power (0.0 to 1.0)
 */
EdkDll.IS_MentalCommandGetCurrentActionPower = function() {
	var IS_MentalCommandGetCurrentActionPower = ELSPlugin()
			.ELS_IS_MentalCommandGetCurrentActionPower();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_MentalCommandGetCurrentActionPower()");
		console.log(IS_MentalCommandGetCurrentActionPower);
	}
	return IS_MentalCommandGetCurrentActionPower;
};

/**
 * Check whether current and default states are with identical EmoEngine state.
 * 
 * @returns: 1: Equal, 0: Different
 */
EdkDll.IS_EmoEngineEqual = function() {
	var IS_EmoEngineEqual = ELSPlugin().ELS_IS_EmoEngineEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_EmoEngineEqual()");
		console.log(IS_EmoEngineEqual);
	}
	return IS_EmoEngineEqual;
};

/**
 * Check whether current and default states are with identical MentalCommand
 * state
 * 
 * @returns: 1: Equal, 0: Different
 */
EdkDll.IS_MentalCommandEqual = function() {
	var IS_MentalCommandEqual = ELSPlugin().ELS_IS_MentalCommandEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_MentalCommandEqual()");
		console.log(IS_MentalCommandEqual);
	}
	return IS_MentalCommandEqual;
};

/**
 * Check whether current and default states are with identical FacialExpression
 * state, i.e. are both state representing the same facial expression
 * 
 * @returns: 1: Equal, 0: Different
 */
EdkDll.IS_FacialExpressionEqual = function() {
	var IS_FacialExpressionEqual = ELSPlugin().ELS_IS_FacialExpressionEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_FacialExpressionEqual()");
		console.log(IS_FacialExpressionEqual);
	}
	return IS_FacialExpressionEqual;
};

/**
 * Check whether current and default states are with identical 'emotiv' state
 * 
 * @returns: 1: Equal, 0: Different
 */
EdkDll.IS_PerformanceMetricEqual = function() {
	var IS_PerformanceMetricEqual = ELSPlugin().ELS_IS_PerformanceMetricEqual();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IS_PerformanceMetricEqual()");
		console.log(IS_PerformanceMetricEqual);
	}
	return IS_PerformanceMetricEqual;
};

/**
 * Returns the FacialExpression-specific event type for an
 * IEE_FacialExpressionEvent event already retrieved using
 * IEE_EngineGetNextEvent.
 * 
 * @returns: IEE_FacialExpressionEvent_t
 */
EdkDll.IEE_FacialExpressionEventGetType = function() {
	var IEE_FacialExpressionEventGetType = ELSPlugin()
			.ELS_IEE_FacialExpressionEventGetType();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionEventGetType()");
		console.log(IEE_FacialExpressionEventGetType);
	}
	return IEE_FacialExpressionEventGetType;
};

/**
 * Get threshold from FacialExpression algorithms
 * 
 * @param userId-
 *            user ID
 * @param algoName -
 *            FacialExpression algorithm type
 * @param thresholdName -
 *            FacialExpression threshold type
 * @returns: int - threshold value
 */
EdkDll.IEE_FacialExpressionGetThreshold = function(userId, algoName,
		thresholdName) {
	var IEE_FacialExpressionGetThreshold = ELSPlugin()
			.ELS_IEE_FacialExpressionGetThreshold(userId, algoName,
					thresholdName);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionGetThreshold(" + userId + ","
				+ algoName + "," + thresholdName + ")");
		console.log(IEE_FacialExpressionGetThreshold);
	}
	return IEE_FacialExpressionGetThreshold;
};

/**
 * Set threshold for FacialExpression algorithms
 * 
 * @param userId -
 *            user ID
 * @param algoName -
 *            FacialExpression algorithm type
 * @param thresholdName -
 *            FacialExpression threshold type
 * @param value: -
 *            threshold value (min: 0 max: 1000)
 * @returns
 */
EdkDll.IEE_FacialExpressionSetThreshold = function(userId, algoName,
		thresholdName, value) {
	var IEE_FacialExpressionSetThreshold = ELSPlugin()
			.ELS_IEE_FacialExpressionSetThreshold(userId, algoName,
					thresholdName, value);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionSetThreshold(" + userId + ","
				+ algoName + "," + thresholdName + "," + value + ")");
		console.log(IEE_FacialExpressionSetThreshold);
	}
	return IEE_FacialExpressionSetThreshold;
};

/**
 * Configures the FacialExpression suite to use either the built-in, universal
 * signature or a personal, trained signature
 * 
 * @param userId -
 *            user ID
 * @param sigType -
 *            signature type to use
 * @returns: EDK_ERROR_CODE - current status of EmoEngine. If the query is
 *           successful, EDK_ERROR_CODE = OK.
 */
EdkDll.IEE_FacialExpressionSetSignatureType = function(userId, sigType) {
	var IEE_FacialExpressionSetThreshold = ELSPlugin()
			.ELS_IEE_FacialExpressionSetSignatureType(userId, sigType);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionSetThreshold(" + userId + ","
				+ sigType + ")");
		console.log(IEE_FacialExpressionSetThreshold);
	}
	return IEE_FacialExpressionSetThreshold;
};

/**
 * Indicates whether the FacialExpression suite is currently using either the
 * built-in, universal signature or a trained signature
 * 
 * @param userId -
 *            user ID
 * @returns: int - the signature type currently in use
 */
EdkDll.IEE_FacialExpressionGetSignatureType = function(userId) {
	var IEE_FacialExpressionGetSignatureType = ELSPlugin()
			.ELS_IEE_FacialExpressionGetSignatureType(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionGetSignatureType(" + userId
				+ ")");
		console.log(IEE_FacialExpressionGetSignatureType);
	}
	return IEE_FacialExpressionGetSignatureType;
};

/**
 * Set the current facial expression for FacialExpression training
 * 
 * @param userId -
 *            user ID
 * @param action -
 *            which facial expression would like to be trained
 * @returns: EDK_ERROR_CODE - current status of EmoEngine. If the query is
 *           successful, EDK_ERROR_CODE = OK.
 */
EdkDll.IEE_FacialExpressionSetTrainingAction = function(userId, action) {
	var IEE_FacialExpressionSetTrainingAction = ELSPlugin()
			.ELS_IEE_FacialExpressionSetTrainingAction(userId, action);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionSetTrainingAction(" + userId
				+ "," + action + ")");
		console.log(IEE_FacialExpressionSetTrainingAction);
	}
	return IEE_FacialExpressionSetTrainingAction;
};

/**
 * Set the control flag for FacialExpression training
 * 
 * @param userId -
 *            user ID
 * @param ee_control -
 *            pre-defined control command
 * @returns: EDK_ERROR_CODE - current status of EmoEngine. If the query is
 *           successful, EDK_ERROR_CODE = OK.
 */
EdkDll.IEE_FacialExpressionSetTrainingControl = function(userId, control) {
	var IEE_FacialExpressionSetTrainingControl = ELSPlugin()
			.ELS_IEE_FacialExpressionSetTrainingControl(userId, control);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionSetTrainingControl(" + userId
				+ "," + control + ")");
		console.log(IEE_FacialExpressionSetTrainingControl);
	}
	return IEE_FacialExpressionSetTrainingControl;
};

/**
 * Gets a list of the actions that have been trained by the user
 * 
 * @param userId -
 *            user ID
 * @returns: a bit vector composed of IEE_FacialExpressionAlgo_t contants
 */
EdkDll.IEE_FacialExpressionGetTrainedSignatureActions = function(userId) {
	var IEE_FacialExpressionGetTrainedSignatureActions = ELSPlugin()
			.ELS_IEE_FacialExpressionGetTrainedSignatureActions(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionGetTrainedSignatureActions("
				+ userId + ")");
		console.log(IEE_FacialExpressionGetTrainedSignatureActions);
	}
	return IEE_FacialExpressionGetTrainedSignatureActions;
};

/**
 * Gets a flag indicating if the user has trained sufficient actions to activate
 * a trained signature
 * 
 * @param userId -
 *            user ID
 * @returns: int that is non-zero if a trained signature can be activated
 */
EdkDll.IEE_FacialExpressionGetTrainedSignatureAvailable = function(userId) {
	var IEE_FacialExpressionGetTrainedSignatureAvailable = ELSPlugin()
			.ELS_IEE_FacialExpressionGetTrainedSignatureAvailable(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_FacialExpressionGetTrainedSignatureAvailable("
				+ userId + ")");
		console.log(IEE_FacialExpressionGetTrainedSignatureAvailable);
	}
	return IEE_FacialExpressionGetTrainedSignatureAvailable;
};

/**
 * Returns the MentalCommand-specific event type for an IEE_MentalCommandEvent
 * event already retrieved using IEE_EngineGetNextEvent.
 * 
 * @returns: IEE_MentalCommandEvent_t
 */
EdkDll.IEE_MentalCommandEventGetType = function() {
	var IEE_MentalCommandEventGetType = ELSPlugin()
			.ELS_IEE_MentalCommandEventGetType();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandEventGetType()");
		console.log(IEE_MentalCommandEventGetType);
	}
	return IEE_MentalCommandEventGetType;
};

/**
 * Gets the current skill rating for particular MentalCommand actions of the
 * user
 * 
 * @param userId -
 *            user ID
 * @param action -
 *            a particular action of IEE_MentalCommandAction_t contant
 * @returns: the action skill rating [from 0.0 to 1.0]
 */
EdkDll.IEE_MentalCommandGetActionSkillRating = function(userId, action) {
	var IEE_MentalCommandGetActionSkillRating = ELSPlugin()
			.ELS_IEE_MentalCommandGetActionSkillRating(userId, action);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetActionSkillRating(" + userId
				+ "," + action + ")");
		console.log(IEE_MentalCommandGetActionSkillRating);
	}
	return IEE_MentalCommandGetActionSkillRating;
};

/**
 * Gets the current overall skill rating of the user in MentalCommand
 * 
 * @param userId -
 *            user ID
 * @returns: the overall skill rating [from 0.0 to 1.0]
 */
EdkDll.IEE_MentalCommandGetOverallSkillRating = function(userId) {
	var IEE_MentalCommandGetOverallSkillRating = ELSPlugin()
			.ELS_IEE_MentalCommandGetOverallSkillRating(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetOverallSkillRating(" + userId
				+ ")");
		console.log(IEE_MentalCommandGetOverallSkillRating);
	}
	return IEE_MentalCommandGetOverallSkillRating;
};

/**
 * Gets a list of the MentalCommand actions that have been trained by the user
 * 
 * @param userId -
 *            user ID
 * @returns: a bit vector composed of IEE_MentalCommandAction_t contants
 */
EdkDll.IEE_MentalCommandGetTrainedSignatureActions = function(userId) {
	var IEE_MentalCommandGetTrainedSignatureActions = ELSPlugin()
			.ELS_IEE_MentalCommandGetTrainedSignatureActions(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetTrainedSignatureActions("
				+ userId + ")");
		console.log(IEE_MentalCommandGetTrainedSignatureActions);
	}
	return IEE_MentalCommandGetTrainedSignatureActions;
};

/**
 * Get the current MentalCommand active action types
 * 
 * @param userId -
 *            user ID
 * @returns: a bit vector composed of IEE_MentalCommandAction_t contants
 */
EdkDll.IEE_MentalCommandGetActiveActions = function(userId) {
	var IEE_MentalCommandGetActiveActions = ELSPlugin()
			.ELS_IEE_MentalCommandGetActiveActions(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetActiveActions(" + userId + ")");
		console.log(IEE_MentalCommandGetActiveActions);
	}
	return IEE_MentalCommandGetActiveActions;
};

/**
 * Get the current enabled MentalCommand action types
 * 
 * @param userId -
 *            user ID
 * @returns: a bit vector composed of IEE_MentalCommandAction_t contants
 */
EdkDll.IEE_MentalCommandGetActionsEnabled = function(userId) {
	var IEE_MentalCommandGetActionsEnabled = ELSPlugin()
			.ELS_IEE_MentalCommandGetActionsEnabled(userId);
	if (EdkDll.DebugLog) {
		console
				.log("EdkDll.IEE_MentalCommandGetActionsEnabled(" + userId
						+ ")");
		console.log(IEE_MentalCommandGetActionsEnabled);
	}
	return IEE_MentalCommandGetActionsEnabled;
};

/**
 * Set the current MentalCommand active action types
 * 
 * @param userId -
 *            user ID
 * @param activeActions -
 *            a bit vector composed of IEE_MentalCommandAction_t contants
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_MentalCommandSetActiveActions = function(userId, activeActions) {
	var IEE_MentalCommandSetActiveActions = ELSPlugin()
			.ELS_IEE_MentalCommandSetActiveActions(userId, activeActions);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandSetActiveActions(" + userId + ","
				+ activeActions + ")");
		console.log(IEE_MentalCommandSetActiveActions);
	}
	return IEE_MentalCommandSetActiveActions;
};

/**
 * Add a MentalCommand action to action list before it is enabled with
 * IEE_EnableMentalCommandActionsList function
 * 
 * @param mentalCommandAction
 * @param cogBool
 * @returns: true if ok, -1 if not
 */
EdkDll.IEE_EnableMentalCommandAction = function(mentalCommandAction, cogBool) {
	var IEE_EnableMentalCommandAction = ELSPlugin()
			.ELS_EnableMentalCommandAction(mentalCommandAction, cogBool);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_EnableMentalCommandAction("
				+ mentalCommandAction + "," + cogBool + ")");
		console.log(IEE_EnableMentalCommandAction);
	}
	return IEE_EnableMentalCommandAction;
};

/**
 * Enable mentalcommand action list (actions were added in
 * IEE_EnableMentalCommandAction function)
 * 
 * @param userId
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_EnableMentalCommandActionsList = function(userId) {
	var IEE_EnableMentalCommandActionsList = ELSPlugin()
			.ELS_EnableMentalCommandActionsList(userId);
	if (EdkDll.DebugLog) {
		console
				.log("EdkDll.IEE_EnableMentalCommandActionsList(" + userId
						+ ")");
		console.log(IEE_EnableMentalCommandActionsList);
	}
	return IEE_EnableMentalCommandActionsList;
};

/**
 * Set the type of MentalCommand action to be trained
 * 
 * @param userId -
 *            user ID
 * @param action -
 *            which action would like to be trained
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_MentalCommandSetTrainingAction = function(userId, action) {
	var IEE_MentalCommandSetTrainingAction = ELSPlugin()
			.ELS_IEE_MentalCommandSetTrainingAction(userId, action);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandSetTrainingAction(" + userId + ","
				+ action + ")");
		console.log(IEE_MentalCommandSetTrainingAction);
	}
	return IEE_MentalCommandSetTrainingAction;
};

/**
 * Set the training control flag for MentalCommand training
 * 
 * @param userId -
 *            user ID
 * @param control -
 *            pre-defined MentalCommand training control
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_MentalCommandSetTrainingControl = function(userId, control) {
	var IEE_MentalCommandSetTrainingControl = ELSPlugin()
			.ELS_IEE_MentalCommandSetTrainingControl(userId, control);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandSetTrainingControl(" + userId
				+ "," + control + ")");
		console.log(IEE_MentalCommandSetTrainingControl);
	}
	return IEE_MentalCommandSetTrainingControl;
};

/**
 * Set the overall sensitivity for all MentalCommand actions
 * 
 * @param userId -
 *            user ID
 * @param level -
 *            sensitivity level of all actions (lowest: 1, highest: 7)
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_MentalCommandSetActivationLevel = function(userId, level) {
	var IEE_MentalCommandSetActivationLevel = ELSPlugin()
			.ELS_IEE_MentalCommandSetActivationLevel(userId, level);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandSetActivationLevel(" + userId
				+ "," + level + ")");
		console.log(IEE_MentalCommandSetActivationLevel);
	}
	return IEE_MentalCommandSetActivationLevel;
};

/**
 * Get the overall sensitivity for all MentalCommand actions
 * 
 * @param userId -
 *            user ID
 * @returns - sensitivity level of all actions (min: 1, max: 10)
 */
EdkDll.IEE_MentalCommandGetActivationLevel = function(userId) {
	var IEE_MentalCommandGetActivationLevel = ELSPlugin()
			.ELS_IEE_MentalCommandGetActivationLevel(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetActivationLevel(" + userId
				+ ")");
		console.log(IEE_MentalCommandGetActivationLevel);
	}
	return IEE_MentalCommandGetActivationLevel;
};

/**
 * Set the sensitivity of MentalCommand actions
 * 
 * @param userId -
 *            user ID
 * @param action1Sensitivity -
 *            sensitivity of action 1 (min: 1, max: 10)
 * @param action2Sensitivity -
 *            sensitivity of action 2 (min: 1, max: 10)
 * @param action3Sensitivity -
 *            sensitivity of action 3 (min: 1, max: 10)
 * @param action4Sensitivity -
 *            sensitivity of action 4 (min: 1, max: 10)
 * @returns
 */
EdkDll.IEE_MentalCommandSetActionSensitivity = function(userId,
		action1Sensitivity, action2Sensitivity, action3Sensitivity,
		action4Sensitivity) {
	var IEE_MentalCommandSetActionSensitivity = ELSPlugin()
			.ELS_IEE_MentalCommandSetActionSensitivity(userId,
					action1Sensitivity, action2Sensitivity, action3Sensitivity,
					action4Sensitivity);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandSetActionSensitivity(" + userId
				+ "," + action1Sensitivity + "," + action2Sensitivity + ","
				+ action3Sensitivity + "," + action4Sensitivity + ")");
		console.log(IEE_MentalCommandSetActionSensitivity);
	}
	return IEE_MentalCommandSetActionSensitivity;
};

/**
 * Query the sensitivity of MentalCommand actions
 * 
 * @param userId -
 *            user ID
 * @returns: array sensitivity of actions
 */
EdkDll.IEE_MentalCommandGetActionSensitivity = function(userId) {
	var IEE_MentalCommandGetActionSensitivity = ELSPlugin()
			.ELS_IEE_MentalCommandGetActionSensitivity(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetActionSensitivity(" + userId
				+ ")");
		console.log(IEE_MentalCommandGetActionSensitivity);
	}
	return IEE_MentalCommandGetActionSensitivity;
};

/**
 * Enable or disable signature caching in MentalCommand
 * 
 * @param userId -
 *            user ID
 * @param enabled -
 *            flag to set status of caching (1: enable, 0: disable)
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_MentalCommandSetSignatureCaching = function(userId, enabled) {
	var IEE_MentalCommandSetSignatureCaching = ELSPlugin()
			.ELS_IEE_MentalCommandSetSignatureCaching(userId, enabled);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandSetSignatureCaching(" + userId
				+ "," + enabled + ")");
		console.log(IEE_MentalCommandSetSignatureCaching);
	}
	return IEE_MentalCommandSetSignatureCaching;
};

/**
 * Query the status of signature caching in MentalCommand
 * 
 * @param userId -
 *            user ID
 * @returns: status of caching (1: enable, 0: disable)
 */
EdkDll.IEE_MentalCommandGetSignatureCaching = function(userId) {
	var IEE_MentalCommandGetSignatureCaching = ELSPlugin()
			.ELS_IEE_MentalCommandGetSignatureCaching(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetSignatureCaching(" + userId
				+ ")");
		console.log(IEE_MentalCommandGetSignatureCaching);
	}
	return IEE_MentalCommandGetSignatureCaching;
};

/**
 * Set the cache size for the signature caching in MentalCommand
 * 
 * @param userId -
 *            user ID
 * @param size -
 *            number of signatures to be kept in the cache (0: unlimited)
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_MentalCommandSetSignatureCacheSize = function(userId, size) {
	var IEE_MentalCommandSetSignatureCacheSize = ELSPlugin()
			.ELS_IEE_MentalCommandSetSignatureCacheSize(userId, size);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandSetSignatureCacheSize(" + userId
				+ "," + size + ")");
		console.log(IEE_MentalCommandSetSignatureCacheSize);
	}
	return IEE_MentalCommandSetSignatureCacheSize;
};

/**
 * Get the current cache size for the signature caching in MentalCommand
 * 
 * @param userId -
 *            user ID
 * @returns: number of signatures to be kept in the cache (0: unlimited)
 */
EdkDll.IEE_MentalCommandGetSignatureCacheSize = function(userId) {
	var IEE_MentalCommandGetSignatureCacheSize = ELSPlugin()
			.ELS_IEE_MentalCommandGetSignatureCacheSize(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_MentalCommandGetSignatureCacheSize(" + userId
				+ ")");
		console.log(IEE_MentalCommandGetSignatureCacheSize);
	}
	return IEE_MentalCommandGetSignatureCacheSize;
};

/**
 * Returns the delta of the movement of the gyro since the previous call for a
 * particular user
 * 
 * @param userId -
 *            user ID for query
 * @returns: array of positions (pXOut, pYOut)
 */
EdkDll.IEE_HeadsetGetGyroDelta = function(userId) {
	var IEE_HeadsetGetGyroDelta = ELSPlugin().ELS_IEE_HeadsetGetGyroDelta(
			userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_HeadsetGetGyroDelta(" + userId + ")");
		console.log(IEE_HeadsetGetGyroDelta);
	}
	return IEE_HeadsetGetGyroDelta;
};

/**
 * Re-zero the gyro for a particular user
 * 
 * @param userId -
 *            user ID for query
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_HeadsetGyroRezero = function(userId) {
	var IEE_HeadsetGyroRezero = ELSPlugin().ELS_IEE_HeadsetGyroRezero(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_HeadsetGyroRezero(" + userId + ")");
		console.log(IEE_HeadsetGyroRezero);
	}
	return IEE_HeadsetGyroRezero;
};

/**
 * Sets the size of the data buffer. The size of the buffer affects how frequent
 * IEE_DataUpdateHandle() needs to be called to prevent data loss.
 * 
 * @param bufferSizeInSec -
 *            buffer size in second
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_DataSetBufferSizeInSec = function(bufferSizeInSec) {
	var IEE_DataSetBufferSizeInSec = ELSPlugin()
			.ELS_IEE_DataSetBufferSizeInSec(bufferSizeInSec);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_DataSetBufferSizeInSec(" + bufferSizeInSec
				+ ")");
		console.log(IEE_DataSetBufferSizeInSec);
	}
	return IEE_DataSetBufferSizeInSec;
};

/**
 * Controls acquisition of data from EmoEngine (which is off by default).
 * 
 * @param userId -
 *            user ID
 * @param enable -
 *            If true, then enables data acquisition - If false, then disables
 *            data acquisition
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if the command succeeded
 */
EdkDll.IEE_DataAcquisitionEnable = function(userId, enable) {
	var IEE_DataAcquisitionEnable = ELSPlugin().ELS_IEE_DataAcquisitionEnable(
			userId, enable);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_DataAcquisitionEnable(" + userId + "," + enable
				+ ")");
		console.log(IEE_DataAcquisitionEnable);
	}
	return IEE_DataAcquisitionEnable;
};

/**
 * Updates the content of the data handle to point to new data since the last
 * call
 * 
 * @param userId -
 *            user ID
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_DataUpdateHandle = function(userId) {
	var IEE_DataUpdateHandle = ELSPlugin().ELS_IEE_DataUpdateHandle(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_DataUpdateHandle(" + userId + ")");
		console.log(IEE_DataUpdateHandle);
	}
	return IEE_DataUpdateHandle;
};

/**
 * Returns number of sample of data stored in the data handle
 * 
 * @returns: number of sample of data stored in the data handle
 */
EdkDll.IEE_DataGetNumberOfSample = function() {
	var IEE_DataGetNumberOfSample = ELSPlugin().ELS_IEE_DataGetNumberOfSample();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_DataGetNumberOfSample()");
		console.log(IEE_DataGetNumberOfSample);
	}
	return IEE_DataGetNumberOfSample;
};

/**
 * Extracts data of a particulat channel from the data handle
 * 
 * @returns: array EEG Data (is used for EEG License)
 */
EdkDll.IEE_DataGet = function() {
	var IEE_DataGet = ELSPlugin().ELS_IEE_DataGet();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_DataGet()");
		console.log(IEE_DataGet);
	}
	return IEE_DataGet;
};

/**
 * Returns a serialized user profile for a default user in a synchronous manner.
 * 
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_GetBaseProfile = function() {
	var IEE_GetBaseProfile = ELSPlugin().ELS_IEE_GetBaseProfile();
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_GetBaseProfile()");
		console.log(IEE_GetBaseProfile);
	}
	return IEE_GetBaseProfile;
};

/**
 * Reset user profile to default
 * 
 * @param userId -
 *            user ID
 * @returns: EDK_ERROR_CODE - EDK_ERROR_CODE = EDK_OK if successful
 */
EdkDll.IEE_SetBaseProfile = function(userId) {
	var IEE_SetBaseProfile = ELSPlugin().ELS_IEE_SetBaseProfile(userId);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_SetBaseProfile(" + userId + ")");
		console.log(IEE_SetBaseProfile);
	}
	return IEE_SetBaseProfile;
};

/**
 * Save user profile to local path
 * 
 * @param userId -
 *            user ID
 * @param profileName -
 *            name of profile to save
 * @returns: 0 if ok, -1 if not
 */
EdkDll.IEE_SaveUserProfile = function(userId, profileName) {
	var IEE_SaveUserProfile = ELSPlugin().ELS_ISaveUserProfile(userId,
			profileName);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_SaveUserProfile(" + userId + "," + profileName
				+ ")");
		console.log(IEE_SaveUserProfile);
	}
	return IEE_SaveUserProfile;
};

/**
 * Load user profile from local path
 * 
 * @param userId -
 *            user ID
 * @param profileName -
 *            name of profile to load
 * @returns: 0 if ok, -1 if not
 */
EdkDll.IEE_LoadUserProfile = function(userId, profileName) {
	var IEE_LoadUserProfile = ELSPlugin().ELS_ILoadUserProfile(userId,
			profileName);
	if (EdkDll.DebugLog) {
		console.log("EdkDll.IEE_LoadUserProfile(" + userId + "," + profileName
				+ ")");
		console.log(IEE_LoadUserProfile);
	}
	return IEE_LoadUserProfile;
};
