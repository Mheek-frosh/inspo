import html.parser
from pathlib import Path

class StructParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_body = False
        self.stack = []
        self.lines = []
        self.skip_tags = {"script","style","noscript","svg","path","meta","link"}
        self.struct_tags = {"body","main","header","footer","nav","section","article","aside","div","form","ul","ol","h1","h2","h3","h4","h5","h6"}
    def handle_starttag(self, tag, attrs):
        if tag == "body":
            self.in_body = True
        if not self.in_body:
            return
        if tag in self.skip_tags:
            return
        d = dict(attrs)
        cls = d.get("class","")
        if isinstance(cls, list):
            cls = " ".join(cls)
        id_ = d.get("id","")
        if tag in self.struct_tags or cls or id_:
            indent = "  " * len(self.stack)
            parts = [tag]
            if id_:
                parts.append('id="' + id_ + '"')
            if cls:
                parts.append('class="' + cls[:150] + '"')
            self.lines.append(indent + " ".join(parts))
            self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag == "body":
            self.in_body = False
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()

for name in ["reference-about","reference-services","reference-contact"]:
    p = Path(r"c:\Users\musid\Desktop\inspo") / (name + ".html")
    text = p.read_text(encoding="utf-8", errors="replace")
    parser = StructParser()
    parser.feed(text)
    print("=== " + name + " ===")
    for line in parser.lines[:100]:
        print(line)
    if len(parser.lines) > 100:
        print("  ... (" + str(len(parser.lines)) + " total structural nodes)")
    print()
