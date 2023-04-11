interface Cable {
    name: string; 
    pin: string;
  }
  
  class andrCable implements Cable {
    name = 'Android';
    pin = 'Type-C';
  }
  
  class iphnCable implements Cable {
    name = 'iPhone';
    pin = 'Lightning';
  }
  
  class Phone {
    constructor(private chargeCable: Cable) {}
  
    connect(chargeCable: Cable) {
      if (chargeCable.pin !== this.chargeCable.pin) {
        console.error(`Failed to connect ${this.chargeCable.name}. Expected ${this.chargeCable.pin} but got ${chargeCable.pin}`);
        return;
      }
      console.log(`Successfully connected ${this.chargeCable.name} with ${chargeCable.pin}`);
    }
  }
  
  const android = new Phone(new andrCable());
  const iphone = new Phone(new iphnCable());
  
  // Compatible
  android.connect(new andrCable());
  iphone.connect(new iphnCable());
  
  // Not compatible
  iphone.connect(new andrCable());
  
  // Compatible with adapter
  class androidToIphoneAdapter implements Cable {
    name = 'Adapter';
    constructor(private chargeCable: andrCable) {}
    get pin() {
      return 'Lightning';
    }
  }
  
  iphone.connect(new androidToIphoneAdapter(new andrCable()));
  