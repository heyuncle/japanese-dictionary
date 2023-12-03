const loadJson = () => {
    $(".result-list").empty();
    $.getJSON("result_data.json", (data) => {
        $.each(data.results, (index, res) => {
            const resultTerm = "<div class='result'><span class='result-term'></span></div><hr>";
            $(".result-list").append(resultTerm);
            const lastResTermAppended = $(".result-term").length - 1;
            const lastResAppended = $(".result").length - 1;
            const ruby_term = ("<ruby class='result-term-reading'>" + res.term + "</ruby>");
            const ruby_yomi = ("<ruby>" + ", " + res.yomikata+ "</ruby>");
            $(".result-term").eq(lastResTermAppended).append(ruby_term);
            $(".result-term").eq(lastResTermAppended).append(ruby_yomi);
            const resultDefList = "<ul class='result-def-list'></ul>";
            $(".result").eq(lastResAppended).append(resultDefList);
            $.each(res.definitions, (index, def) => {
                const lastUlAppended = $(".result-def-list").length - 1;
                const li = ("<li>" + def + "</li>");
                $(".result-def-list").eq(lastUlAppended).append(li);
            })
        })
    });
}

const runOmnitool = () => {
    const searchQuery = "{\"search\": \"" + $("#textinput").val() + "\"}";
    fetch("http://localhost:3000/translate", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: searchQuery
    });
}

$(document).ready(() => {
    $("#go").on('click', (e) => {
        e.preventDefault(); // Prevent page from reloading.
        $.when(runOmnitool()).done(() => {
            setTimeout(() => {
                loadJson();
            }, 1500);
            // Must load json after program finishes.
        })
    });
});
