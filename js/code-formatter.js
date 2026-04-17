// Formateur de code avec coloration syntaxique basique
function formatCode(code, language = 'python') {
    // Échapper le HTML d'abord
    code = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    if (language === 'python') {
        // Mots-clés Python
        const keywords = ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'self', 'try', 'except', 'with', 'as', 'pass', 'break', 'continue'];
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">${kw}</span>`);
        });
        
        // Commentaires Python (#)
        code = code.replace(/(#.*$)/gm, '<span class="comment">$1</span>');
        
        // Strings Python
        code = code.replace(/(['"]{1,3}.*?['"]{1,3})/g, '<span class="string">$1</span>');
        
        // Nombres
        code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
        
        // Fonctions (word suivie de parenthèse)
        code = code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="function">$1</span>');
        
    } else if (language === 'csharp' || language === 'unity') {
        // Mots-clés C#
        const keywords = ['using', 'public', 'private', 'void', 'class', 'if', 'else', 'for', 'while', 'return', 'new', 'this', 'float', 'int', 'bool', 'string', 'var', 'static'];
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">${kw}</span>`);
        });
        
        // Commentaires C# (//)
        code = code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
        
        // Strings C#
        code = code.replace(/(".*?")/g, '<span class="string">$1</span>');
        
        // Nombres
        code = code.replace(/\b(\d+\.?\d*f?)\b/g, '<span class="number">$1</span>');
        
    } else if (language === 'javascript' || language === 'js') {
        // Mots-clés JS
        const keywords = ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'class', 'new', 'this', 'true', 'false', 'null'];
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">${kw}</span>`);
        });
        
        // Commentaires JS (//)
        code = code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
        
        // Strings JS
        code = code.replace(/(['"`].*?['"`])/g, '<span class="string">$1</span>');
        
        // Nombres
        code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
    }
    
    return `<pre><code>${code}</code></pre>`;
}

// Fonction pour rendre le code plus lisible (ajouter indentation visible)
function beautifyCode(code) {
    // Ajouter des espaces visuels pour l'indentation
    return code.split('\n').map(line => {
        const indent = line.match(/^\s*/)[0].length;
        const indentSpaces = '  '.repeat(Math.floor(indent / 4));
        return indentSpaces + line.trim();
    }).join('\n');
}
