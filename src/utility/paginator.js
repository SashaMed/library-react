export function getNumberOfPagesToContainEntities(entities, entitiesPerPage) {
    let entitiesNumber = entities.length;
    return Math.ceil(entitiesNumber / entitiesPerPage);
}

export function getEntitiesOfPage(entitiesList, targetPage, entitiesPerPage) {
    if (!entitiesList.length) {
        return entitiesList;
    }

    let acceptableTargetPage = getClosestAcceptableTargetPage(entitiesList, targetPage, entitiesPerPage);
    let entitiesNumber = entitiesList.length;

    let firstEntityOfPageIndex = entitiesPerPage * (acceptableTargetPage - 1);

    let lastEntityOfPageIndex = firstEntityOfPageIndex + entitiesPerPage;
    if (lastEntityOfPageIndex > entitiesNumber) {
        lastEntityOfPageIndex = entitiesNumber;
    }

    return entitiesList.slice(firstEntityOfPageIndex, lastEntityOfPageIndex);
}

export function getClosestAcceptableTargetPage(entitiesList, targetPage, entitiesPerPage) {
    let maxPage = getNumberOfPagesToContainEntities(entitiesList, entitiesPerPage);
    if (targetPage < 1) {
        return 1;
    } else if (targetPage > maxPage) {
        return maxPage;
    }
    return targetPage;
}
