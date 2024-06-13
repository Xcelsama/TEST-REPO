import 'fs';
const handler = async (_0x763d14, {
  conn: _0x24b82a,
  text: _0x26ad6b,
  isOwner: _0x44bf4c,
  isAdmin: _0x2cb29f
}) => {
  try {
    const _0x301458 = _0x763d14.quoted ? _0x763d14.quoted : _0x763d14;
    const _0x1e3f91 = _0x763d14.quoted ? await _0x763d14.getQuotedObj() : _0x763d14;
    const _0x29d2d3 = _0x24b82a.cMod(_0x763d14.chat, {
      [_0x763d14.quoted ? _0x301458.mtype : "extendedTextMessage"]: _0x763d14.quoted ? _0x1e3f91.message[_0x301458.mtype] : {
        'text': '' || _0x1e3f91
      }
    }, {
      'quoted': _0x763d14,
      'userJid': _0x24b82a.user.id
    });
    await _0x24b82a.relayMessage(_0x763d14.chat, _0x29d2d3.message, {
      'messageId': _0x29d2d3.key.id
    });
  } catch {
    const _0x321d4d = _0x763d14.quoted ? _0x763d14.quoted : _0x763d14;
    const _0x29a652 = (_0x321d4d.msg || _0x321d4d).mimetype || '';
    const _0x1d926c = /image|video|sticker|audio/.test(_0x29a652);
    const _0x2590d3 = String.fromCharCode(0x200e);
    const _0x510865 = _0x2590d3.repeat(0x352);
    const _0x107ca8 = '' + (_0x26ad6b ? _0x26ad6b : "*Hey Reply with media to add caption*");
    if (_0x1d926c && _0x321d4d.mtype === "imageMessage" && _0x107ca8) {
      var _0x3e0fd1 = await _0x321d4d.download?.();
      _0x24b82a.sendMessage(_0x763d14.chat, {
        'image': _0x3e0fd1,
        'caption': _0x107ca8
      }, {
        'quoted': _0x763d14
      });
    } else {
      if (_0x1d926c && _0x321d4d.mtype === "videoMessage" && _0x107ca8) {
        var _0x3e0fd1 = await _0x321d4d.download?.();
        _0x24b82a.sendMessage(_0x763d14.chat, {
          'video': _0x3e0fd1,
          'mimetype': "video/mp4",
          'caption': _0x107ca8
        }, {
          'quoted': _0x763d14
        });
      } else {
        await _0x24b82a.relayMessage(_0x763d14.chat, {
          'extendedTextMessage': {
            'text': _0x510865 + "\n" + _0x107ca8 + "\n",
            ...{
              'contextInfo': {
                'externalAdReply': {
                  'thumbnail': imagen1,
                  'sourceUrl': md
                }
              }
            }
          }
        }, {});
      }
    }
  }
};
handler.command = /^(caption|cap|cp)$/i;
handler.tags = ["tools"];
handler.group = false;
handler.admin = false;
export default handler;