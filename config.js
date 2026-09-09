const CONFIG = {
  festivalName: "बालसंस्कार फेस्टिवल २०२६",
  organizer: "श्री राधाकृष्ण फ्रेंड्स क्लब, शिरवळ",
  tagline: "सृजनशीलता • संस्कृती • आत्मविश्वास • बालपण",
  about: {
    paragraph: "श्री राधाकृष्ण फ्रेंड्स क्लब, शिरवळ यांच्यातर्फे आयोजित “बालसंस्कार फेस्टिवल २०२६” हा उपक्रम मुलांमध्ये कला, संस्कृती आणि आत्मविश्वास रुजवण्यासाठी सुरू करण्यात आला आहे. विविध माध्यमांतून मुलांना स्वतःला व्यक्त करण्याची व शिकण्याची संधी या फेस्टिव्हलमध्ये दिली जाते.",
    values: [
      { icon: "🎭", title: "संस्कृती", desc: "परंपरेची ओळख व जपणूक" },
      { icon: "🎨", title: "सृजनशीलता", desc: "कल्पनाशक्तीला वाव" },
      { icon: "🌟", title: "आत्मविश्वास", desc: "व्यासपीठाद्वारे धैर्य" },
      { icon: "📖", title: "शिस्त व ज्ञान", desc: "आनंददायी शिकवण" }
    ]
  },
  // Competitions (Selectable)
  competitions: [
    { id: "drawing",    name: "चित्रकला स्पर्धा", icon: "🎨" },
    { id: "mehendi",    name: "मेहंदी स्पर्धा", icon: "🌿" },
    { id: "speech",     name: "भाषण स्पर्धा", icon: "🎙️" },
    { id: "essay",      name: "निबंध स्पर्धा", icon: "📝" },
    { id: "singing",    name: "गायन स्पर्धा", icon: "🎤" },
    { id: "dance",      name: "नृत्य स्पर्धा", icon: "💃" },
    { id: "fancydress", name: "फॅन्सी ड्रेस स्पर्धा", icon: "👗" },
    { id: "drama",      name: "नाट्य अभिनय स्पर्धा", icon: "🎬" },
    { id: "rangoli",    name: "रांगोळी स्पर्धा", icon: "🌺" }
  ],
  // Workshops (Non-selectable, Display Only)
  workshops: [
    { id: "cultschool", name: "“सांस्कारिक शाळा” व्याख्यान", icon: "🏫" },
    { id: "artist",     name: "“मी सांस्कृतिक कलाकार”", icon: "🖌️" },
    { id: "selfdef",    name: "सेल्फ प्रोटेक्शन कार्यशाळा", icon: "🥋" }
  ],
  closingEvent: { name: "पारितोषिक वितरण समारंभ", icon: "🏆" },
  googleScriptUrl: "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec",
  regIdPrefix: "BSF26"
};
