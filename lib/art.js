const imageSrc = [
    
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/2%20left.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/2%20right.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/3%20left.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/3%20middle.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/3%20right.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20blue%20green.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20green%20yellow.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20red%20blue.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/4%20yellow%20red.png',
    'https://xgzssoosjqorfdzkfxbw.supabase.co/storage/v1/object/public/vault/1%20eye.png',
];

// TODO will return counter even if stage = 1, art = 9... add the restriction
const counter = (stage, art) => {
    art = +art;
    let counter = 0;
    let value = +stage;
    
    while (value > 1) {
        counter = counter + value;
        value = value - 1;
    }
    return counter + art;
    // stage = +stage;
    // art = +art;
    // let counter = 0;
    // let value = stage - 1;
    // while ( value ) {
    //   counter = counter + value;
    //   value = value - 1;
    // }
    // counter = counter + art;
    // return counter;
};

export {
    imageSrc,
    counter
}