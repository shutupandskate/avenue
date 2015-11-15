var LogoAnimation = {
    init: function() {
        this.$logo = $("#logo");
        this.svgNS = "http://www.w3.org/2000/svg";

        this.letterIter  = 0;

        for(key in LogoData) {
            var letterData = LogoData[key],
                letter = key;

            this.elemIter = 0;
            for (key in letterData) {
                var id = "logo__" + letter + "__"  + key;
                this.drawLetter(id, letterData[key]);
            }
            this.letterIter++;
        }
    },

    drawLetter: function(id, data) {
        var pointsStr = data.points,
            points = pointsStr.split(" "),
            stagesAmount = points.length/2 - 1,
            nextPoints = points,
            $poly = document.createElementNS(this.svgNS, "polygon");

        $poly.setAttribute("id", id);
        this.$logo.append($poly);

        for(var i=1; i <= stagesAmount; i++) {
            var anim = document.createElementNS(this.svgNS, "animate");

            anim.setAttribute("attributeName", "points");
            anim.setAttribute("to", nextPoints.join(" "));
            anim.setAttribute("begin", this.letterIter*0.1 + (stagesAmount - i)*0.15 + 's');
            anim.setAttribute("dur", '0.4s');
            anim.setAttribute("repeatCount", "1");
            anim.setAttribute("fill", "freeze");

            $poly.appendChild(anim);

            var right = points.length/2,
                left = right - 1;

            for(var j=0; j<i; j++) {
                nextPoints[left - j] = points[left - i];
                nextPoints[right + j]= points[right + i];
            }

            if(i == stagesAmount) {
                $poly.setAttribute("fill" , data.fill);
                $poly.setAttribute("points", nextPoints.join(" "));
            }
        }
    }
};


$(document).on("ready", function() {
    LogoAnimation.init();
});