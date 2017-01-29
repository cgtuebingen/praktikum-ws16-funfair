//Constructor with param is object of EmoState
function EmoState(es) {
	//this.hEmoState = EdkDll.EE_EmoStateCreate();
	this.hEmoState = EdkDll.EE_EmoStateCreate();
	//EdkDll.ES_Copy(this.hEmoState,es.GetHandle());
}

function EmoState() {
	this.hEmoState = EdkDll.EE_EmoStateCreate();
	//this.hEmoState = EdkDll.EE_EmoStateCreate();
}
//EmoState.prototype.hEmoState = EdkDll.EE_EmoStateCreate();

EmoState.prototype.Clone = function() {
	return new EmoState(this);
};

EmoState.prototype.GetHandle = function() {
	return this.hEmoState;
};

// <summary>
// return EdkDll.the time since EmoEngine has been successfully connected to the headset
// </summary>
// <remarks>
// If the headset is disconnected from EmoEngine due to low battery or weak
// wireless signal, the time will be reset to zero.
// </remarks>
// <returns>time in second</returns>
EmoState.prototype.GetTimeFromStart = function() {
	return EdkDll.ES_GetTimeFromStart();
};

// <summary>
// return EdkDll.whether the headset has been put on correctly or not
// </summary>
// <remarks>
// If the headset cannot not be detected on the head, then signal quality will not report
// any results for all the channels
// </remarks>
// <returns>int (1: On, 0: Off)</returns>
EmoState.prototype.GetHeadsetOn = function() {
	//not used
};

// <summary>
// Query the number of channels of available sensor contact quality data
// </summary>
// <returns>number of channels for which contact quality data is available</returns>
// return EdkDll.int
EmoState.prototype.ES_GetContactQualityFromAllChannels = function() {
	return EdkDll.ES_GetContactQualityFromAllChannels();
};

// <summary>
// Query the contact quality of a specific EEG electrode
// </summary>
// <param name="electroIdx">The index of the electrode for query</param>
// <returns>Enumerated value that characterizes the EEG electrode contact for the specified input channel</returns>
// return EdkDll. EE_EEG_ContactQuality_t
EmoState.prototype.GetContactQuality = function(electroIdx) {
	//not used
};

// <summary>
// Query the contact quality of all the electrodes in one  call
// </summary>
// <remarks>
// The contact quality will be stored in the array, contactQuality, passed to the function.
// The value stored in contactQuality[0] is identical to the result returned by
// ES_GetContactQuality(state, 0)
// The value stored in contactQuality[1] is identical to the result returned by
// ES_GetContactQuality(state, 1). etc.
// The ordering of the array is consistent with the ordering of the logical input
// channels in EE_InputChannels_enum.
// </remarks>
// <returns>Number of signal quality values copied to the contactQuality array.</returns>

/*function EE_EEG_ContactQuality_t[] GetContactQualityFromAllChannels()
{
	EE_EEG_ContactQuality_t[] contactQuality;
	ES_GetContactQualityFromAllChannels(hEmoState, out contactQuality);
	return EdkDll.contactQuality;
}
 */

// <summary>
// Query whether the user is blinking at the time the EmoState is captured.
// </summary>
// <returns>blink status (true: blink, false: not blink)</returns>
EmoState.prototype.ExpressivIsBlink = function() {
	//return EdkDll.ES_ExpressivIsBlink(this.hEmoState);
	return EdkDll.ES_ExpressivIsBlink();
};

// <summary>
// Query whether the user is winking left at the time the EmoState is captured.
// </summary>
// <returns>left wink status (true: wink, false: not wink)</returns>
EmoState.prototype.ExpressivIsLeftWink = function() {
	return EdkDll.ES_ExpressivIsLeftWink();
};

// <summary>
// Query whether the user is winking right at the time the EmoState is captured.
// </summary>
// <returns>right wink status (true: wink, false: not wink)</returns>
EmoState.prototype.ExpressivIsRightWink = function() {
	return EdkDll.ES_ExpressivIsRightWink();
};

// <summary>
// Query whether the eyes of the user are opened at the time the EmoState is captured.
// </summary>
// <returns>eye open status (true: eyes open, false: eyes closed)</returns>
EmoState.prototype.ExpressivIsEyesOpen = function() {
	return EdkDll.ES_ExpressivIsEyesOpen();
};

// <summary>
// Query whether the user is looking up at the time the EmoState is captured.
// </summary>
// <returns>eyes position (true: looking up, false: not looking up)</returns>
EmoState.prototype.ExpressivIsLookingUp = function() {
	return EdkDll.ES_ExpressivIsLookingUp();
};

// <summary>
// Query whether the user is looking down at the time the EmoState is captured.
// </summary>
// <returns>eyes position (true: looking down, false: not looking down)</returns>
EmoState.prototype.ExpressivIsLookingDown = function() {
	return EdkDll.ES_ExpressivIsLookingDown();
};

// <summary>
// Query whether the user is looking left at the time the EmoState is captured.
// </summary>
// <returns>eye position (true: looking left, false: not looking left)</returns>
EmoState.prototype.ExpressivIsLookingLeft = function() {
	return EdkDll.ES_ExpressivIsLookingLeft();
};

// <summary>
// Query whether the user is looking right at the time the EmoState is captured.
// </summary>
// <returns>eye position (true: looking right, false: not looking right)</returns>
EmoState.prototype.ExpressivIsLookingRight = function() {
	return EdkDll.ES_ExpressivIsLookingRight();
};

// <summary>
// Query the eyelids state of the user
// </summary>
// <remarks>
// The left and right eyelid state are stored in the parameter leftEye and rightEye
// respectively. They are floating point values ranging from 0.0 to 1.0.
// 0.0 indicates that the eyelid is fully opened while 1.0 indicates that the
// eyelid is fully closed.
// </remarks>
// <param name="size">size of array (0.0 to 1.0)</param>
// <return> leftEye = array[0],rightEye = array[1]</return>
EmoState.prototype.ExpressivGetEyelidState = function(size) {
	//not used
};
EmoState.prototype.ExpressivGetEyelidState1 = function(leftEye, rightEye) {
	//not used
};

// <summary>
// Query the eyes position of the user
// </summary>
// <remarks>
// The horizontal and vertical position of the eyes are stored in the parameter x and y
// respectively. They are floating point values ranging from -1.0 to 1.0.
// 
// For horizontal position, -1.0 indicates that the user is looking left while
// 1.0 indicates that the user is looking right.
// 
// For vertical position, -1.0 indicates that the user is looking down while
// 1.0 indicatest that the user is looking up.
// 
// This function assumes that both eyes have the same horizontal or vertical positions.
// (i.e. no cross eyes)
// </remarks>
// <param name="x">the horizontal position of the eyes</param>
// <param name="y">the veritcal position of the eyes</param>
EmoState.prototype.ExpressivGetEyeLocation1 = function(x, y) {
	//not used
};

EmoState.prototype.ExpressivGetEyeLocation = function(size) {
	//not used
};

// <summary>
// Returns the eyebrow extent of the user (Obsolete function)
// </summary>
// <returns>eyebrow extent value (0.0 to 1.0)</returns>
EmoState.prototype.ExpressivGetEyebrowExtent = function() {
	return EdkDll.ES_ExpressivGetEyebrowExtent();
};

// <summary>
// Returns the smile extent of the user (Obsolete function)
// </summary>
// <returns>smile extent value (0.0 to 1.0)</returns>
EmoState.prototype.ExpressivGetSmileExtent = function() {
	return EdkDll.ES_ExpressivGetSmileExtent();
};

// <summary>
// Returns the clench extent of the user (Obsolete function)
// </summary>
// <returns>clench extent value (0.0 to 1.0)</returns>
EmoState.prototype.ExpressivGetClenchExtent = function() {
	return EdkDll.ES_ExpressivGetClenchExtent();
};

// <summary>
// Returns the detected upper face Expressiv action of the user
// </summary>
// <returns>pre-defined Expressiv action types</returns>
// return EdkDll.EE_ExpressivAlgo_t 
EmoState.prototype.ExpressivGetUpperFaceAction = function() {
	return EdkDll.ES_ExpressivGetUpperFaceAction();
};

// <summary>
// Returns the detected upper face Expressiv action power of the user
// </summary>
// <returns>power value (0.0 to 1.0)</returns>
EmoState.prototype.ExpressivGetUpperFaceActionPower = function() {
	return EdkDll.ES_ExpressivGetUpperFaceActionPower();
};

// <summary>
// Returns the detected lower face Expressiv action of the user
// </summary>
// <returns>pre-defined Expressiv action types</returns>
// return EdkDll.EE_ExpressivAlgo_t 
EmoState.prototype.ExpressivGetLowerFaceAction = function() {
	return EdkDll.ES_ExpressivGetLowerFaceAction();
};

// <summary>
// Returns the detected lower face Expressiv action power of the user
// </summary>
// <returns>power value (0.0 to 1.0)</returns>
EmoState.prototype.ExpressivGetLowerFaceActionPower = function() {
	return EdkDll.ES_ExpressivGetLowerFaceActionPower();
};

// <summary>
// Query whether the signal is too noisy for Expressiv detection to be active
// </summary>
// <param name="type">Expressiv detection type - EE_ExpressivAlgo_t</param>
// <returns>detection state (false: Not Active, true: Active)</returns>
EmoState.prototype.ExpressivIsActive = function(type) {
	//need to add
};

// <summary>
// Returns the long term excitement level of the user
// </summary>
// <returns>excitement level (0.0 to 1.0)</returns>
EmoState.prototype.AffectivGetExcitementLongTermScore = function() {
	return EdkDll.ES_AffectivGetExcitementLongTermScore();
};

// <summary>
// Returns short term excitement level of the user
// </summary>
// <returns>excitement level (0.0 to 1.0)</returns>
EmoState.prototype.AffectivGetExcitementShortTermScore = function() {
	return EdkDll.ES_AffectivGetExcitementShortTermScore();
};

// <summary>
// Returns short term Valence level of the user
// </summary>
// <returns>excitement level (0.0 to 1.0)</returns>
EmoState.prototype.AffectivGetValenceScore = function() {
	return EdkDll.ES_AffectivGetValenceScore();
};

// <summary>
// Query whether the signal is too noisy for Affectiv detection to be active
// </summary>
// <param name="type">Affectiv detection type - EE_AffectivAlgo_t </param>
// <returns>detection state (false: Not Active, true: Active)</returns>
EmoState.prototype.AffectivIsActive = function(type) {
	//need to add
};

// <summary>
// Returns meditation level of the user
// </summary>
// <returns>meditation level (0.0 to 1.0)</returns>
EmoState.prototype.AffectivGetMeditationScore = function() {
	return EdkDll.ES_AffectivGetMeditationScore();
};

// <summary>
// Returns frustration level of the user
// </summary>
// <returns>frustration level (0.0 to 1.0)</returns>
EmoState.prototype.AffectivGetFrustrationScore = function() {
	return EdkDll.ES_AffectivGetFrustrationScore();
};

// <summary>
// Returns engagement/boredom level of the user
// </summary>
// <returns>engagement/boredom level (0.0 to 1.0)</returns>
EmoState.prototype.AffectivGetEngagementBoredomScore = function() {
	return EdkDll.ES_AffectivGetEngagementBoredomScore();
};

// <summary>
// Returns the detected Cognitiv action of the user
// </summary>
// <returns>Cognitiv action type - EE_CognitivAction_t</returns>
EmoState.prototype.CognitivGetCurrentAction = function() {
	return EdkDll.ES_CognitivGetCurrentAction();
};

// <summary>
// Returns the detected Cognitiv action power of the user
// </summary>
// <returns>Cognitiv action power (0.0 to 1.0)</returns>
EmoState.prototype.CognitivGetCurrentActionPower = function() {
	return EdkDll.ES_CognitivGetCurrentActionPower();
};

// <summary>
// Query whether the signal is too noisy for Cognitiv detection to be active
// </summary>
// <returns>detection state (false: Not Active, true: Active)</returns>
EmoState.prototype.CognitivIsActive = function() {
	//need to add
};

// <summary>
// Query of the current wireless signal strength
// </summary>
// <returns>
// wireless signal strength [No Signal, Bad, Fair, Good, Excellent].
// </returns>
// return EdkDll.EE_SignalStrength_t
EmoState.prototype.GetWirelessSignalStatus = function() {
	return EdkDll.ES_GetWirelessSignalStatus();
};

// <summary>
// Get the level of charge remaining in the headset battery
// </summary>
// <param name="chargeLevel">the current level of charge in the headset battery</param>
// <param name="maxChargeLevel">the maximum level of charge in the battery</param>
EmoState.prototype.GetBatteryChargeLevel = function() {
	return EdkDll.ES_GetBatteryChargeLevel();
};

// <summary>
// Check whether two states are with identical 'emotiv' state
// </summary>
// <param name="state">integer</param>
// <returns>true: Equal, false: Different</returns>
EmoState.prototype.AffectivEqual = function(state) {
	return EdkDll.ES_AffectivEqual();
};

// <summary>
// Check whether two states are with identical Expressiv state, i.e. are both state representing the same facial expression
// </summary>
// <param name="state">integer</param>
// <returns>true: Equal, false: Different</returns>
EmoState.prototype.ExpressivEqual = function(state) {
	return EdkDll.ES_ExpressivEqual();
};

// <summary>
// Check whether two states are with identical Cognitiv state
// </summary>
// <param name="state">Integer</param>
// <returns>true: Equal, false: Different</returns>
EmoState.prototype.CognitivEqual = function(state) {
	return EdkDll.ES_CognitivEqual();
};

// <summary>
// Check whether two states are with identical EmoEngine state.
// </summary>
// <remarks>
// This function is comparing the time since EmoEngine start,
// the wireless signal strength and the signal quality of different channels
// </remarks>
// <param name="state">Integer</param>
// <returns>true: Equal, false: Different</returns>
EmoState.prototype.EmoEngineEqual = function() {
	return EdkDll.ES_EmoEngineEqual();
};

// <summary>
// Check whether two EmoStateHandles are identical
// </summary>
// <param name="a">Integer</param>
// <param name="b">Integer</param>
// <returns></returns>
EmoState.prototype.Equals = function() {
	//need to add
};

EmoState.prototype.IS_GetTimeFromStart = function() {
	return EdkDll.IS_GetTimeFromStart();
};

EmoState.prototype.IS_GetWirelessSignalStatus = function() {
	return EdkDll.IS_GetWirelessSignalStatus();
};

EmoState.prototype.IS_GetBatteryChargeLevel = function() {
	return EdkDll.IS_GetBatteryChargeLevel();
};

EmoState.prototype.IS_GetContactQualityFromAllChannels = function() {
	return EdkDll.IS_GetContactQualityFromAllChannels();
};

EmoState.prototype.IS_GetContactQuality = function() {
	return EdkDll.IS_GetContactQuality();
};

//AF3 = 0, T7 = 1, Pz = 2, T8 = 3, AF4 = 4;
EmoState.prototype.IS_GetContactQualities = function() {
	return EdkDll.IS_GetContactQualities();
};

EmoState.prototype.IS_FacialExpressionIsBlink = function() {
	return EdkDll.IS_FacialExpressionIsBlink();
};

EmoState.prototype.IS_FacialExpressionIsEyesOpen = function() {
	return EdkDll.IS_FacialExpressionIsEyesOpen();
};

EmoState.prototype.IS_FacialExpressionIsLeftWink = function() {
	return EdkDll.IS_FacialExpressionIsLeftWink();
};

EmoState.prototype.IS_FacialExpressionIsRightWink = function() {
	return EdkDll.IS_FacialExpressionIsRightWink();
};

EmoState.prototype.IS_FacialExpressionIsLookingUp = function() {
	return EdkDll.IS_FacialExpressionIsLookingUp();
};

EmoState.prototype.IS_FacialExpressionIsLookingDown = function() {
	return EdkDll.IS_FacialExpressionIsLookingDown();
};

EmoState.prototype.IS_FacialExpressionGetEyebrowExtent = function() {
	return EdkDll.IS_FacialExpressionGetEyebrowExtent();
};

EmoState.prototype.IS_FacialExpressionGetClenchExtent = function() {
	return EdkDll.IS_FacialExpressionGetClenchExtent();
};

EmoState.prototype.IS_FacialExpressionGetSmileExtent = function() {
	return EdkDll.IS_FacialExpressionGetSmileExtent();
};

EmoState.prototype.IS_FacialExpressionGetLowerFaceAction = function() {
	return EdkDll.IS_FacialExpressionGetLowerFaceAction();
};

EmoState.prototype.IS_FacialExpressionGetLowerFaceActionPower = function() {
	return EdkDll.IS_FacialExpressionGetLowerFaceActionPower();
};

EmoState.prototype.IS_FacialExpressionGetUpperFaceAction = function() {
	return EdkDll.IS_FacialExpressionGetUpperFaceAction();
};

EmoState.prototype.IS_FacialExpressionGetUpperFaceActionPower = function() {
	return EdkDll.IS_FacialExpressionGetUpperFaceActionPower();
};

EmoState.prototype.IS_PerformanceMetricGetEngagementBoredomScore = function() {
	return EdkDll.IS_PerformanceMetricGetEngagementBoredomScore();
};

EmoState.prototype.IS_PerformanceMetricGetExcitementLongTermScore = function() {
	return EdkDll.IS_PerformanceMetricGetExcitementLongTermScore();
};

EmoState.prototype.IS_PerformanceMetricGetInstantaneousExcitementScore = function() {
	return EdkDll.IS_PerformanceMetricGetInstantaneousExcitementScore();
};

EmoState.prototype.IS_PerformanceMetricGetStressScore = function() {
	return EdkDll.IS_PerformanceMetricGetStressScore();
};

EmoState.prototype.IS_PerformanceMetricGetRelaxationScore = function() {
	return EdkDll.IS_PerformanceMetricGetRelaxationScore();
};

EmoState.prototype.IS_PerformanceMetricGetInterestScore = function() {
	return EdkDll.IS_PerformanceMetricGetInterestScore();
};

EmoState.prototype.IS_PerformanceMetricRawValueGet = function() {
	return EdkDll.IS_PerformanceMetricRawValueGet();
};

EmoState.prototype.IS_MentalCommandGetCurrentAction = function() {
	return EdkDll.IS_MentalCommandGetCurrentAction();
};

EmoState.prototype.IS_MentalCommandGetCurrentActionPower = function() {
	return EdkDll.IS_MentalCommandGetCurrentActionPower();
};

EmoState.prototype.IS_EmoEngineEqual = function() {
	return EdkDll.IS_EmoEngineEqual();
};

EmoState.prototype.IS_MentalCommandEqual = function() {
	return EdkDll.IS_MentalCommandEqual();
};

EmoState.prototype.IS_FacialExpressionEqual = function() {
	return EdkDll.IS_FacialExpressionEqual();
};

EmoState.prototype.IS_PerformanceMetricEqual = function() {
	return EdkDll.IS_PerformanceMetricEqual();
};
