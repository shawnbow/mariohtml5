/**
	Simple demo of the engine.
	Code by Rob Kleffner, 2011
*/

Enjine.Application = function() {
    this.canvas = null;
    this.timer = null;
    this.stateContext = null;
    this.receiver = new cast.receiver.Receiver('Dev_App', ['Test'],"",5);
    this.channelHandler = new cast.receiver.ChannelHandler('Test');
    this.channelHandler.addEventListener(cast.receiver.Channel.EventType.MESSAGE, this.KeyEventHandler.bind(this));
};

Enjine.Application.prototype = {
    Update: function(delta) {
        
        this.stateContext.Update(delta);
        
        this.canvas.BeginDraw();
        
        this.stateContext.Draw(this.canvas.BackBufferContext2D);
        
        this.canvas.EndDraw();
    },
    
    Initialize: function(defaultState, resWidth, resHeight) {
        this.canvas = new Enjine.GameCanvas();
        this.timer = new Enjine.GameTimer();
        Enjine.KeyboardInput.Initialize();
        console.log(this.channelHandler);
        this.channelHandler.addChannelFactory(this.receiver.createChannelFactory('Test'));
        this.receiver.start();

        this.canvas.Initialize("canvas", resWidth, resHeight);
        this.timer.UpdateObject = this;
        
        this.stateContext = new Enjine.GameStateContext(defaultState);
        
        this.timer.Start();
    },

    KeyEventHandler: function(cast_event) {
        var e;
        if (cast_event.message.type == "keydown") {
            e = jQuery.Event("keydown");
            e.keyCode = cast_event.message.keyCode;
            Enjine.KeyboardInput.KeyDownEvent(e);
            //Enjine.KeyboardInput.Pressed[cast_event.message.keycode] = true;
	    } else {
            e = jQuery.Event("keyup");
            e.keyCode = cast_event.message.keyCode;
            Enjine.KeyboardInput.KeyUpEvent(e);
            //Enjine.KeyboardInput.Pressed[cast_event.message.keycode] = false;
	    }
    },
};
