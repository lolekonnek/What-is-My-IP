var ip = "";
    let voices = [];

    const button = document.getElementById('button');
    
    function loadVoices() {
    voices = speechSynthesis.getVoices();
    console.log("Dostępne głosy:");
    voices.forEach(v => console.log(`${v.name} - ${v.lang}`));
}
speechSynthesis.onvoiceschanged = loadVoices;


    async function speechIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            ip = data.ip;
            document.getElementById('IP').innerHTML = ip;
            ip = ip.replace('.', ' ').replace('.', ' ').replace('.', ' ').replace('.', ' ');
            ip = ip .split('').join(' ');
            ip = ip.join('!');
        } catch (error) {
            console.error('error feching IP adress', error);
        }
    }

    speechIP()
    button.addEventListener('click', () => {
      const msg = new SpeechSynthesisUtterance(ip);

      msg.lang = "pl-PL";
       const femaleVoice = voices.find(v => v.name === "Microsoft Paulina - Polish (Poland)") 
                        || voices.find(v => v.name.toLowerCase().includes("paulina")) 
                        || voices.find(v => v.lang === "pl-PL"); 

    msg.voice = femaleVoice;
    msg.pitch = 10;
    msg.rate = 0.5;

      window.speechSynthesis.speak(msg);
    });
